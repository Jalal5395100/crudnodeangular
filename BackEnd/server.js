const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/user');

//online mongodb
//mongodb://localhost:27017/localdb
//mongodb+srv://jalal_new1:lZ9F2tOUKz3SFSyq@cluster0.hcszu.mongodb.net/meanstackDatabase?retryWrites=true&w=majority

mongoose.connect("mongodb+srv://jalal_new1:LAurIUGBd2oedXo5@cluster0.hcszu.mongodb.net/task?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex : true
})
.then(()=>{
console.log("db connected")
}).catch((error)=>{
console.log("connected failed",error)
})

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

  app.use("/api/user",userRoute);
  

    
module.exports = app;