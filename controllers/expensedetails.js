const expensedb = require("../models/expensedb");
const asyncHandler = require("express-async-handler");

exports.addExpensedetails = asyncHandler(async (req, res) => {
    try {
        const {
            date,
            user_details,
            expense_type,
            amount,
            gst_number,
            gst_percentage,
            cgst,
            sgst
        } = req.body;

        if (!date || !expense_type || !amount) {
            return res.status(400).json({ status: "failed", message: "Date, expense_type, and amount are required" });
        }

        const newExpense = new expensedb({
            date,
            user_details,
            expense_type,
            amount,
            gst_number,
            gst_percentage,
            cgst,
            sgst
        });

        const savedData = await newExpense.save();

        res.status(201).json({ status: "success", data: savedData });
    } catch (error) {
        console.error("Error creating expense entry:", error);
        res.status(500).json({ status: "failed", message: "Server error", error: error.message });
    }
});

// `getExpensedetails` and `deleteExpensedetails` remain unchanged as they fetch/delete all fields automatically
exports.getExpensedetails = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const data = await expensedb.find().skip(skip).limit(limit);
        const totalCount = await expensedb.countDocuments();

        if (!data || data.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "No expense details found"
            });
        }

        return res.status(200).json({
            status: "success",
            data: data,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalCount,
                limit
            }
        });
    } catch (err) {
        console.log(`Error fetching expense details: ${err.message}`);
        return res.status(500).json({
            status: "failed",
            message: "An error occurred while fetching the data. Please try again later.",
            error: err.message
        });
    }
});

exports.deleteExpensedetails = asyncHandler(async (req, res) => {
    try {
        const { ids } = req.body;

        const deletedExpense = await expensedb.deleteMany({
            _id: { $in: ids }
        });

        if (deletedExpense.deletedCount === 0) {
            return res.status(404).json({ status: "failed", message: 'No expense details found to delete' });
        }

        res.status(200).json({
            status: 'success',
            message: `${deletedExpense.deletedCount} expense details deleted successfully`
        });
    } catch (error) {
        console.error('Error deleting expense details:', error);
        res.status(500).json({ status: "failed", message: 'Server error', error: error.message });
    }
});