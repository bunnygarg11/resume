 
 const mongoose=require("mongoose")
 const bcrypt=require("bcryptjs")
 const jwt=require("jsonwebtoken")
 const UserSchema=new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     email:{
         type:String,
         required:true,
         unique:true
     },
     password:{
         type:String,
         required:true
     },
     avatar:{
         type:String
     },
     date:{
         type:Date,
         default:Date.now
     }
 })
 UserSchema.methods.generateAuthToken=async function(){
     const user=this
     const token=jwt.sign({_id:user._id.toString()},"thisisjwt",{expiresIn:36000})
     return token
 }
//  UserSchema.statics.findByCredentials=async (email,password)=>{
//      const user=await User.findOne({email})
//     if(!user){
//         throw Error("login invalid")
//     }
//     const isverfied=bcrypt.compare(password,user.password)
//     if(!isverfied){
//         throw Error("wrong password")
//     }
//     return user
//  }
UserSchema.statics.findbyCredentials=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw Error("login invalid")
    }
    const isverified=await bcrypt.compare(password,user.password)
    if(!isverified){
        throw Error("login invalid")
    }
    return user
}
UserSchema.pre("save", async function(next){
    const user=this
    if(user.isModified("password")){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})
 module.exports=User=mongoose.model("user",UserSchema)