const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const userRouter = require('./routes/user.route.js');

mongoose.connect(process.env.MONGO).then(()=>{
    
    console.log("Connected to MongoDB!!");
})
.catch((err)=>{
    console.log("Error connecting to MongoDB!!",err);
});

const app = express();
app.use(express.json());

app.listen(3000,()=>{
    console.log('Server running at port 3000!!');
})

app.use('/api/user',userRouter);


