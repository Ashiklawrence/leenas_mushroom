const asyncHandler = require("express-async-handler");
const beddb = require("../models/beddb");
//  add bed details
exports.addBeddetails = asyncHandler(async (req, res) => {
  try {
    // Destructure data from the request body
    const {
      date,
      harvest_time,
      quantity,
      no_of_packets,
      remarks,
    } = req.body;

    // Check if all required fields are provided
    if (
      !date ||
      !harvest_time ||
      !quantity ||
      !no_of_packets 
    ) {
      return res.status(400).json({status:"failed", message: "All fields are required" });
    }

    // Create a new document with the provided data
    const newbed = new beddb({
        date,
        harvest_time,
        quantity,
        no_of_packets,
        remarks,
    });

    // Save the new document to the database
    const savedData = await newbed.save();

    // Send the saved data in the response
    res.status(201).json({status:"success",message: 'Bed details updated successfully',data:savedData});
  } catch (error) {
    console.error("Error creating bed entry:", error);
    res.status(500).json({status:"failed", message: "Server error", error: error.message });
  }
});

// get bed details with pagination
exports.getBeddetails = asyncHandler(async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Calculate the starting index of the documents to fetch
        const startIndex = (page - 1) * limit;

        // Fetch the documents with pagination
        const beddata = await beddb
            .find()
            .skip(startIndex)
            .limit(Number(limit));

        // Get the total count of documents
        const total = await beddb.countDocuments();

        // Send the paginated data in the response
        res.status(200).json({
            status:"success",
            pagination: {
              total,
              pages: Number(page),
              limit: Number(limit)
          },
            data: beddata,
        });
    } catch (error) {
        console.error("Error fetching bed details:", error);
        res.status(500).json({status:"failed", message: "Server error", error: error.message });
    }
});