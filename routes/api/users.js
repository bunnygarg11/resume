const express=require("express")
const gravatar=require("gravatar")
const {check,validationResult}=require("express-validator")
const route=express.Router()

const User=require("../../models/User")
route.post("/",[
    check("name","Name is required").not().isEmpty(),
    check("email","please include valid email").isEmail(),
    check("password","Please enter a password with 6 or more characters").isLength({  min:6})
],async (req,res)=>{
    // console.log(req.body)
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password,name}=req.body
    try {
        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({errors:[{msg:"user already exists"}]})
        }
        const avatar=gravatar.url(email,{
            s:"200",
            r:"pg",
            d:"mm"
        })
        user=new User({
            name,
            email,password,
            avatar
        })
        const token=await user.generateAuthToken()
       await user.save()
        res.send({token})

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

})

module.exports=route