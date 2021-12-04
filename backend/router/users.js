var express = require('express')
const helpers = require('../helpers/helpers')
var jwt = require('jsonwebtoken');
var router = express.Router()
var hlpers = require('../helpers/helpers')
const cloudinary = require('cloudinary');
const { response } = require('express');
cloudinary.config({ 
    cloud_name: 'ds1xkcryt', 
    api_key: '564747678435513', 
    api_secret: 'YoBWFf9Y3jeb4VhaKaoZr_3ME1w',
    secure: true
  });

router.post('/signup',(req,res)=>{
  try {
   
      helpers.addUsers(req.body).then((response)=>{
          console.log(response)
          res.json(true)
      })
  } catch (error) {

      console.log("errorr "+error)
  }
})

router.post('/login',(req,res)=>{
    try {
       
        helpers.chechUsers(req.body).then((user)=>{
           
            if(user){
               // Generating jwt token 
                const accessToken = jwt.sign({id:user._id,username:user.name},"mySecretKey",{expiresIn: '60s'})
                res.json({
                    id:user._id,
                    username:user.name,
                    accessToken
                })
            }else if(user==false){
                
                res.json({status:false})
            }
        })
    } catch (error) {
        console.log("errorr "+error)
    }
  })

  router.get("/home",(req,res)=>{

    console.log("headerr")
    let token = req.header("accessToken")
    token = token.split(" ")[1]
    if(!token){
        res.json({status:false,msg:"access denied"})
    }else{
        jwt.verify(token,"mySecretKey",(err,user)=>{
            
            if(err){
                console.log("error"+err)
                res.json({status:false,msg:"Token is not valid"})
            }else{
                console.log(user)   
                req.user = user
                res.json({status:true})
            }
        })
    }
    console.log(token)
})

router.post("/create",async(req,res)=>{
    try {
        console.log("create image")
        console.log(req.body)
        const fileStr = req.body.imageUrl
        const uploadedResponse =await cloudinary.uploader.upload(fileStr,{
            upload_preset:'dev_setup'
        }) 
        console.log(uploadedResponse)
        let uploads =await helpers.uploadDetails(req.body.name,req.body.category,req.body.price,uploadedResponse.url)
        console.log("details of products")
        console.log(uploads)
        res.json({status:true,data:uploads})
    } catch (error) {
        console.log("error    "+error)
        res.json({status:false})
    }
})
router.get("/products",async(req,res)=>{
    try {
        let products = await helpers.findProducts()
        console.log("respone +++++++++++++++")
        console.log(products)
        res.json({data:products})
        
    } catch (error) {
        
    }
})

module.exports = router