const mongoose = require('mongoose')
require('dotenv').config();


const connectDB = async ()=>{
        try{
            const connect = await mongoose.connect(process.env.MONGO_URI)
            console.log('Database connected')
        }catch(err){
            console.log("DB error",err)
            process.exit(1)
        }
}

module.exports = connectDB