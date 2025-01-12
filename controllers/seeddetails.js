const asyncHandler = require("express-async-handler");
const seeddb = require("../models/seeddb");
//  add seed details
exports.addSeeddetails = asyncHandler(async (req, res) => {
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
      !no_of_packets ||
      !remarks
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new document with the provided data
    const newseed = new seeddb({
        date,
        harvest_time,
        quantity,
        no_of_packets,
        remarks,
    });

    // Save the new document to the database
    const savedData = await newseed.save();

    // Send the saved data in the response
    res.status(201).json(savedData);
  } catch (error) {
    console.error("Error creating seed entry:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// get seed details with pagination
exports.getSeeddetails = asyncHandler(async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Calculate the starting index of the documents to fetch
        const startIndex = (page - 1) * limit;

        // Fetch the documents with pagination
        const seed = await seeddb
            .find()
            .skip(startIndex)
            .limit(Number(limit));

        // Get the total count of documents
        const total = await seeddb.countDocuments();

        // Send the paginated data in the response
        res.status(200).json({
            total,
            page: Number(page),
            limit: Number(limit),
            seed,
        });
    } catch (error) {
        console.error("Error fetching seed details:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});