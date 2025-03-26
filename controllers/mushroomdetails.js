const asyncHandler = require("express-async-handler");
const mushroomdb = require("../models/mushroomdb");
//  add mushroom details
exports.addMushroomdetails = asyncHandler(async (req, res) => {
  try {
    // Destructure data from the request body
    const {
      date,
      harvest_time,
      quantity,
      damage,
      remarks,
    } = req.body;

    // Check if all required fields are provided
    if (
      !date ||
      !harvest_time ||
      !quantity ||
      !damage 
    ) {
      return res.status(400).json({status:"failed", message: "All fields are required" });
    }

    // Create a new document with the provided data
    const newMushroom = new mushroomdb({
        date,
        harvest_time,
        quantity,
        damage,
        remarks,
    });

    // Save the new document to the database
    const savedData = await newMushroom.save();

    // Send the saved data in the response
    res.status(201).json({status:"success",data:savedData});
  } catch (error) {
    console.error("Error creating mushroom entry:", error);
    res.status(500).json({status:"failed", message: "Server error", error: error.message });
  }
});

// get mushroom details with pagination
exports.getMushroomdetails = asyncHandler(async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Calculate the starting index of the documents to fetch
        const startIndex = (page - 1) * limit;

        // Fetch the documents with pagination
        const mushrooms = await mushroomdb
            .find()
            .skip(startIndex)
            .limit(Number(limit));

        // Get the total count of documents
        const total = await mushroomdb.countDocuments();

        // Send the paginated data in the response
        res.status(200).json({
            status:"success",  
            pagination: {
              total,
              pages: Number(page),
              limit: Number(limit)
          },
            data:mushrooms,
        });
    } catch (error) {
        console.error("Error fetching mushroom details:", error);
        res.status(500).json({status:"failed", message: "Server error", error: error.message });
    }
});