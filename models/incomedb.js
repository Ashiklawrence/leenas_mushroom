const mongoose = require('mongoose')
// 
const incomedbSchema = mongoose.Schema({
    date : {
        type : Date,
        required : true,
    },
    user_details : {
        type : String,
        required : true,
    },
    source : {
        type : Number,
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    }
},{timestamps : true})

module.exports = mongoose.model("incomedb",incomedbSchema)