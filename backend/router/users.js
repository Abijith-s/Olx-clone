var express = require('express')
const helpers = require('../helpers/helpers')
var jwt = require('jsonwebtoken');
var router = express.Router()
var hlpers = require('../helpers/helpers')



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

module.exports = router