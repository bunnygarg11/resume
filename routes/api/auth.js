const express=require("express")
const {check,validationResult}=require("express-validator")
const route=express.Router()
const auth=require("../../middlewares/auth")
const User=require("../../models/User")

route.get("/",auth,async (req,res)=>{
    try{
        const user=await User.findById(req._id).select("-password")
        res.send(user)
    }catch(err){
        console.log(err.msg)
        res.status(500).send("server error")
    }

    
})
route.post("/",[
    check("email","please enter valid email").isEmail(),
    check("password","password is required").exists()

],async (req,res)=>{
   const errors= validationResult(req)
   if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
   }
    const {email,password}=req.body

    try{
       const user=await User.findbyCredentials(email,password)
       const token=await user.generateAuthToken()
       res.json({user,token})
    }catch(err){
        console.log(err.message)
        res.status(500).send('Server error');

    }
})
module.exports=route