const jwt=require("jsonwebtoken")
module.exports=function(req,res,next){
    const token=req.header("x-auth-token")
    if(!token){
        return res.status(401).json({msg:"No token,authorization failed"})
    }
try{
    const decoded=jwt.verify(token,"thisisjwt")
    req._id=decoded._id
    next()

}catch(err){
    res.status(401).json({msg:"Token is not valid"})
}
}