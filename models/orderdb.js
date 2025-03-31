


const mongoose = require('mongoose');

const orderdbSchema = mongoose.Schema({
    date: {
        type: Date
    },
    item: {
        type: String
    },
    payment_details: {
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
    },
    // GST Details - flattened
    gst_details: {
        invoice_number: { type: String },
        date: { type: Date },
        custName: { type: String },
        address: { type: String },
        gst_number: { type: String },
        item: { type: String },
        qnty: { type: Number },
        rate: { type: Number },
        amount: { type: Number },
        cgst: { type: Number },
        sgst: { type: Number },
        courier_charge: { type: Number },
        total: { type: Number }
    },
    // Local Details - flattened
    local_details: {
        date: { type: Date },
        item: { type: String },
        quantity: { type: Number },
        rate: { type: Number },
        amount: { type: Number },
        total: { type: Number },
        name: { type: String },
        address: { type: String },
        bill_no: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model("orderdb", orderdbSchema);