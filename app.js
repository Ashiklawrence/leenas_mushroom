const express = require('express')
const app = express()
const cors = require('cors')
// using body parser
const bodyParser = require('body-parser')
// connecting db
const connectDB = require('./config/db')
connectDB();
//
const port = 3001
// json parser
app.use(bodyParser.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
// cors
app.use(cors())
// routes

const authroutes = require('./routes/auth')
app.use("/auth",authroutes)

app.listen(port,()=>{
    console.log('App is running on port',port)
})

app.get('/test',(req,res)=>{
    const msg = {'message' : 'Success'}
    res.json(msg)
})