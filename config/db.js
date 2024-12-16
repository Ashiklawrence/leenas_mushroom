const mongoose = require('mongoose')


const connectDB = async ()=>{
        try{
            const connect = await mongoose.connect('mongodb+srv://ashik:ashik123@cluster0.f4y1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
            console.log('Database connected')
        }catch(err){
            console.log("DB error",err)
            process.exit(1)
        }
}

module.exports = connectDB