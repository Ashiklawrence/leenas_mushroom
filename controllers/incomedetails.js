const incomedb = require("../models/incomedb");
const asyncHandler = require("express-async-handler");


// Add Income Details
exports.addIncomedetails = asyncHandler(async (req, res) => {
    try {
        const { date, user_details, source, income_type, amount, gst } = req.body;

        if (!date || !income_type || !amount) {
            return res.status(400).json({ status: 'failed', message: 'All required fields must be provided' });
        }

        const newIncome = new incomedb({
            date,
            user_details,
            source,
            income_type,
            amount,
            gst,
        });

        const savedData = await newIncome.save();

        res.status(201).json({ status: 'success', data: savedData });
    } catch (error) {
        console.error('Error creating income entry:', error);
        res.status(500).json({ status: 'failed', message: 'Server error', error: error.message });
    }
});

// Get Income Details with Pagination
exports.getiIncomedetails = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const data = await incomedb.find().skip(skip).limit(limit);
        const totalCount = await incomedb.countDocuments();

        if (!data || data.length === 0) {
            return res.status(404).json({ status: 'failed', message: 'No income details found' });
        }

        return res.status(200).json({
            status: 'success',
            data,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalCount,
                limit,
            },
        });
    } catch (err) {
        console.error(`Error fetching income details: ${err.message}`);
        res.status(500).json({ status: 'failed', message: 'Server error', error: err.message });
    }
});

// Delete Income Details
exports.deleteIncomedetails = asyncHandler(async (req, res) => {
    try {
        const { ids } = req.body;
        const deletedIncomes = await incomedb.deleteMany({ _id: { $in: ids } });

        if (deletedIncomes.deletedCount === 0) {
            return res.status(404).json({ status: 'failed', message: 'No income details found to delete' });
        }

        res.status(200).json({
            status: 'success',
            message: `${deletedIncomes.deletedCount} income details deleted successfully`,
        });
    } catch (error) {
        console.error('Error deleting income details:', error);
        res.status(500).json({ status: 'failed', message: 'Server error', error: error.message });
    }
});
