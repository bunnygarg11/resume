const express=require("express")
const Profile=require("../../models/Profile")
const auth=require("../../middlewares/auth")
const {check,validationResult}=require("express-validator")

const route=express.Router()


route.get("/me",auth,async(req,res)=>{
   try{
    const profile=await Profile.findOne({user:req._id}).populate("user",["name","avatar"])
    if(!profile){
        return res.status(400).json({msg:"there is no profile for this user"})
    }
    res.json(profile)
   }catch(err){
       console.log(err.message)
       res.status(500).send("server error")
   }

})
route.post("/",[
    auth,
    check("status","status is required").not().isEmpty(),
    check("skills","skill required").not().isEmpty()
],async (req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const {
        company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    }=req.body
    
    const profileFields = {};
    profileFields.user = req._id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    try{

        const profile=await Profile.findOneAndUpdate({user:req._id},{$set:profileFields},{new:true,upsert:true})
    }catch(err){
        console.log(err.message)
        res.status(500).send("server error")
    }

})

module.exports=route