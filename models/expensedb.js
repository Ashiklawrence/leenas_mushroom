const mongoose = require('mongoose')
// 
const expensedbSchema = mongoose.Schema({
    date : {
        type : Date,
        required : true,
    },
    user_details : {
        type : String,
    },
    expense_type : {
        type : String,
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    }
},{timestamps : true})

module.exports = mongoose.model("expensedb",expensedbSchema)