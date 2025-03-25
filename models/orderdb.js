const mongoose = require('mongoose')
// 
const orderdbSchema = mongoose.Schema({
    date : {
        type : Date,
        required : true,
    },
    item :{
        type : String,
    },
    order_type :{
        type : String,
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
    },
    courier_provider: {
        type : String,
        required : true
    },
    courier_ref_no:{
        type : String,
        required : true
    },
    tracking_id:{
        type : String,
    },
    tracking_status : {
        type : String,
        required : true
    },
    payment_status:{
        type : String,
    }
},{timestamps : true})

module.exports = mongoose.model("orderdb",orderdbSchema)