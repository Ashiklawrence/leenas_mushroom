const mongoose = require('mongoose')
// 
const mushroomdbSchema = mongoose.Schema({
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
    damage : {
        type : Number,
        required : true,
    },
    remarks : {
        type : String,
        default : '',
    }
},{timestamps : true})

module.exports = mongoose.model("mushroomdb",mushroomdbSchema)