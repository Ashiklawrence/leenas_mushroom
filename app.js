const express = require('express')
const app = express()
const cors = require('cors')
// using body parser
const bodyParser = require('body-parser')
// connecting db
const connectDB = require('./config/db')
connectDB();
//
const port = process.env.PORT || 3000
// json parser
app.use(bodyParser.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
// cors
app.use(cors())
// routes

const authroutes = require('./routes/auth')
app.use("/auth",authroutes)

// call routes
const calldetails = require('./routes/calldetails')
app.use("/calldetails",calldetails)

// order routes
const orderdetails = require('./routes/orderdetails')
app.use("/orderdetails",orderdetails)

// income routes
const incomedetails = require('./routes/incomedetails')
app.use("/incomedetails",incomedetails)

// expense routes
const expensedetails = require('./routes/expensedetails')
app.use("/expensedetails",expensedetails)

// mushroom routes
const mushroomdetails = require('./routes/mushroomdetails')
app.use("/mushroomdetails",mushroomdetails)

// seed routes
const seeddetails = require('./routes/seeddetails')
app.use("/seeddetails",seeddetails)

// bed routes
const beddetails = require('./routes/beddetails')
app.use("/beddetails",beddetails)


app.listen(port,()=>{
    console.log('App is running on port', port)
})

app.get('/test',(req,res)=>{
    const msg = {'message' : 'success'}
    res.json(msg)
})

// crone job
const https = require('https');

setInterval(() => {
    https.get('https://leenas-mushroom.onrender.com', (res) => {
        console.log(`Pinged self with status: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error('Error pinging self:', err);
    });
}, 13 * 60 * 1000); // Ping every 13 minutes

//https://leenas-mushroom.onrender.com