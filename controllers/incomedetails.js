const incomedb = require("../models/incomedb");
const asyncHandler = require("express-async-handler");


exports.addIncomedetails = asyncHandler(async (req, res) => {
    try {
        const {
        date,
        user_details,
        source,
        income_type,
        amount,
        } = req.body;
    
        if (
        !date ||
        !income_type ||
        !amount
        ) {
        return res.status(400).json({ message: "All fields are required" });
        }
    
        const newIncome = new incomedb({
            date,
            user_details,
            source,
            income_type,
            amount,
        });
    
        const savedData = await newIncome.save();
    
        res.status(201).json(savedData);
    } catch (error) {
        console.error("Error creating income entry:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

//get income details
exports.getiIncomedetails = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        // Fetch call details with pagination
        const data = await incomedb.find().skip(skip).limit(limit);

        // Get the total count of documents for pagination info
        const totalCount = await incomedb.countDocuments();

        // Check if data is found
        if (!data || data.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "No income details found"
            });
        }

        // Calculate total pages based on the count and limit
        const totalPages = Math.ceil(totalCount / limit);

        // Return success response with data and pagination info
        return res.status(200).json({
            status: "success",
            data: data,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalCount: totalCount,
                limit: limit
            }
        });
    } catch (err) {
        // Log the error for better tracking
        console.log(`Error fetching income details: ${err.message}`);

        // Return a structured error response
        return res.status(500).json({
            status: "failed",
            message: "An error occurred while fetching the data. Please try again later.",
            error: err.message
        });
    }
});

//delete income details
exports.deleteIncomedetails = asyncHandler(async (req, res) => {
    try {
        const { ids } = req.body; // Get the list of IDs from the request body

        // Delete multiple documents by their IDs
        const deletedIncomes = await incomedb.deleteMany({
            _id: { $in: ids } // Use $in to match any of the IDs in the array
        });

        // Check if any documents were deleted
        if (deletedIncomes.deletedCount === 0) {
            return res.status(404).json({ message: 'No income details found to delete' });
        }

        // Return a success message
        res.status(200).json({
            status: 'success',
            message: `${deletedIncomes.deletedCount} income details deleted successfully`
        });
    } catch (error) {
        console.error('Error deleting income details:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});