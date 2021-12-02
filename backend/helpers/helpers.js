const mongoose = require('mongoose')
var id = mongoose.Types.ObjectId

// schema for signup
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    password:String
})
// collection for signUp
const userInfo = mongoose.model('signup',userSchema)

module.exports ={
    addUsers:(body)=>{
       return new Promise((resolve,reject)=>{
           const users = new userInfo({
               name:body.name,
               email:body.email,
               phone:body.phone,
               password:body.password
           })
           users.save((err,details)=>{
               if(err){
                   console.log(err+"err")
               }else{
                   resolve(details)
               }
           })
       }) 
    },
    chechUsers:(body)=>{
        return new Promise((resolve,reject)=>{
            userInfo.findOne({email:body.email}).then((response)=>{
            
                if(response){
                   
                    userInfo.findOne({password:body.password}).then((result)=>{
                   
                        if(result){
                         
                            resolve(result)
                        }else{
                        
                            resolve(false)
                        }
                    })
                }else{
                   
                    resolve(false)
                }
            })
        })
    }
}