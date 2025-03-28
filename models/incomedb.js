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
        type:String,
        default: null,  // This makes the field nullable
    }
}, { timestamps: true });

module.exports = mongoose.model('incomedb', incomedbSchema);
