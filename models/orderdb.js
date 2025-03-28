const mongoose = require('mongoose');

const orderdbSchema = mongoose.Schema({
    date: {
        type: Date
    },
    item: {
        type: String
    },
    order_type: {
        type: String
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    pincode: {
        type: String
    },
    phone_number: {
        type: String
    },
    catalogue: {
        type: String
    },
    quantity: {
        type: Number
    },
    courier_data: {
        type: String
    },
    courier_provider: {
        type: String
    },
    courier_ref_no: {
        type: String
    },
    tracking_id: {
        type: String
    },
    tracking_status: {
        type: String
    },
    payment_status: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("orderdb", orderdbSchema);