const expensedb = require("../models/expensedb");
const asyncHandler = require("express-async-handler");


exports.addExpensedetails = asyncHandler(async (req, res) => {
    try {
        const {
        date,
        user_details,
        expense_type,
        amount,
        } = req.body;
    
        if (
        !date ||
        !expense_type ||
        !amount
        ) {
        return res.status(400).json({ message: "All fields are required" });
        }
    
        const newExpense = new expensedb({
            date,
            user_details,
            expense_type,
            amount,
        });
    
        const savedData = await newExpense.save();
    
        res.status(201).json(savedData);
    } catch (error) {
        console.error("Error creating expense entry:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

//get expense details
exports.getExpensedetails = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        // Fetch call details with pagination
        const data = await expensedb.find().skip(skip).limit(limit);

        // Get the total count of documents for pagination info
        const totalCount = await expensedb.countDocuments();

        // Check if data is found
        if (!data || data.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "No expense details found"
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
        console.log(`Error fetching expense details: ${err.message}`);

        // Return a structured error response
        return res.status(500).json({
            status: "failed",
            message: "An error occurred while fetching the data. Please try again later.",
            error: err.message
        });
    }
});

//delete expense details
exports.deleteExpensedetails = asyncHandler(async (req, res) => {
    try {
        const { ids } = req.body; // Get the list of IDs from the request body

        // Delete multiple documents by their IDs
        const deletedExpense = await expensedb.deleteMany({
            _id: { $in: ids } // Use $in to match any of the IDs in the array
        });

        // Check if any documents were deleted
        if (deletedExpense.deletedCount === 0) {
            return res.status(404).json({ message: 'No expense details found to delete' });
        }

        // Return a success message
        res.status(200).json({
            status: 'success',
            message: `${deletedExpense.deletedCount} expense details deleted successfully`
        });
    } catch (error) {
        console.error('Error deleting expense details:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});