const mongoose = require('mongoose')
// 
const seeddbSchema = mongoose.Schema({
    date : {
        type : Date,
        required : true,
    },
    harvest_time : {
        type : String,
        required : true,
    },
    quantity : {
        type : Number,
        required : true,
    },
    no_of_packets : {
        type : Number,
        required : true,
    },
    remarks : {
        type : String,
        required : true,
    }
},{timestamps : true})

module.exports = mongoose.model("seeddb",seeddbSchema)