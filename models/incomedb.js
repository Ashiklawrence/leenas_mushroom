const mongoose = require('mongoose');

const incomedbSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    user_details: {
        type: String,
    },
    source: {
        type: String,
    },
    income_type: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    gst: {
        type: String,
        default: null,  // Existing nullable field
    },
    gst_number: {
        type: String,
        default: null,  // Nullable field
    },
    gst_percentage: {
        type: String,
        default: null,  // Nullable field
    },
    cgst: {
        type: String,
        default: null,  // Nullable field (Central GST)
    },
    sgst: {
        type: String,
        default: null,  // Nullable field (State GST)
    }
}, { timestamps: true });

module.exports = mongoose.model('incomedb', incomedbSchema);