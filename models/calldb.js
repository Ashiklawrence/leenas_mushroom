const mongoose = require('mongoose')
// 
const calldbSchema = mongoose.Schema({
    date : {
        type : Date,
        required : true,
    },
    call_type : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    phone_number : {
        type : String,
        required : true
    },
    purpose : {
        type : String,
        required : true
    },
    current_status : {
        type : String,
        required : true
    },
},{timestamps : true})

module.exports = mongoose.model("calldb",calldbSchema)