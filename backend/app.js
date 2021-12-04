const express = require('express')
var app = express()
require('dotenv').config()
var userRouter = require('./router/users')
var cors = require('cors')
var db = require('./connections/connection')


db.connect((err)=>{
    if(err){
      console.log("connection failed")
    }else{
      console.log("database connected successfully")
    }
  });
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: false }));
app.use(cors())
app.use('/',userRouter)

const PORT = process.env.PORT || 3002
app.listen(PORT, ()=>{
    console.log(`server starts at port :${PORT}`)
})