const mongoose = require('mongoose');

const expensedbSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    user_details: {
        type: String,
    },
    expense_type: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    gst_number: {
        type: String,
        default: null,  // Nullable field
    },
    gst_percentage: {
        type: String ,
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

module.exports = mongoose.model("expensedb", expensedbSchema);