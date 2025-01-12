const mongoose = require('mongoose')
// 
const orderdbSchema = mongoose.Schema({
    date : {
        type : Date,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    pincode : {
        type : String,
        required : true,
    },
    phone_number : {
        type : String,
        required : true
    },
    catalogue : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    courier_data: {
        type : String,
        required : true
    },
    tracking_status : {
        type : String,
        required : true
    },
},{timestamps : true})

module.exports = mongoose.model("orderdb",orderdbSchema)