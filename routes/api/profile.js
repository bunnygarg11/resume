const express=require("express")
const Profile=require("../../models/Profile")
const User=require("../../models/User")
const auth=require("../../middlewares/auth")
const Posts=require("../../models/Posts")
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
        res.json(profile)
    }catch(err){
        console.log(err.message)
        res.status(500).send("server error")
    }

})
route.get("/",async (req,res)=>{
    try{const profile=await Profile.find().populate("user",["name","avatar"])
    res.json(profile)}catch(err){
        console,log(err.message)
        res.status(500).send("server error")
    }
})

route.get("/user/:id",async(req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.params.id}).populate("user",["name","avatar"])
        if(!profile)return res.status(400).send("there is no profile for the user")
        res.json(profile)
    }catch(err){
        console.log(err.message)
        if(err.kind=="ObjectId")return res.status(400).send("there is no profile for the user")
        res.status(500).send("server error")
    }
})

route.delete("/",auth,async (req,res)=>{
    try{
        await Posts.deleteMany({user:req._id})
        await Profile.findOneAndRemove({user:req._id})
        await User.findByIdAndRemove(req._id)

        res.json({msg:"sucessfully deleted"})

    }catch(err){
        console.log(err.message)
        res.status(500).send("server error")
    }
})
route.put("/experience",[
    auth,
    check("title","title is required").not().isEmpty(),
    check("company","company is required").not().isEmpty(),
    check("from","from is required").not().isEmpty()
],async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      } = req.body
    let newExperience= {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      }
      try {
          const profile=await Profile.findOne({user:req._id})
          
              profile.experience.unshift(newExperience)
              await profile.save()
            res.json(profile)
          
      } catch (err) {
          console.log(err.message)
          res.status(500).send("server error")
          
      }


})
route.delete("/experience/:id",auth,async (req,res)=>{
    const profile=await Profile.findOne({user:req._id})
   const removeindex= profile.experience.map(item=>item._id.toString()).indexOf(req.params.id)
   profile.experience.splice(removeindex,1)
   await profile.save()
   res.json(profile)
})

route.put(
    '/education',
    [
      auth,
      [
        check('school', 'School is required')
          .not()
          .isEmpty(),
        check('degree', 'Degree is required')
          .not()
          .isEmpty(),
        check('fieldofstudy', 'Field of study is required')
          .not()
          .isEmpty(),
        check('from', 'From date is required')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      } = req.body;
  
      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      };
  
      try {
        const profile = await Profile.findOne({ user: req._id });
  
        profile.education.unshift(newEdu);
  
        await profile.save();
  
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
  // @route    DELETE api/profile/education/:edu_id
  // @desc     Delete education from profile
  // @access   Private
  //router.delete('/education/:edu_id', auth, async (req, res) => {
    //try {
      //const profile = await Profile.findOne({ user: req.user.id });
  
      // Get remove index
      //const removeIndex = profile.education
        //.map(item => item.id)
        //.indexOf(req.params.edu_id);
  /*
      profile.education.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  */
  
  route.delete("/education/:edu_id", auth, async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req._id });
      const eduIds = foundProfile.education.map(edu => edu._id.toString());
      // if i dont add .toString() it returns this weird mongoose coreArray and the ids are somehow objects and it still deletes anyway even if you put /education/5
      const removeIndex = eduIds.indexOf(req.params.edu_id);
      if (removeIndex === -1) {
        return res.status(500).json({ msg: "Server error" });
      } else {
        // theses console logs helped me figure it out
        /*   console.log("eduIds", eduIds);
        console.log("typeof eduIds", typeof eduIds);
        console.log("req.params", req.params);
        console.log("removed", eduIds.indexOf(req.params.edu_id));
   */ foundProfile.education.splice(
          removeIndex,
          1,
        );
        await foundProfile.save();
        return res.status(200).json(foundProfile);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  });
  // @route    GET api/profile/github/:username
  // @desc     Get user repos from Github
  // @access   Public
  route.get('/github/:username', (req, res) => {
    try {
      const options = {
        uri: encodeURI(`https://api.github.com/users/${
          req.params.username
        }/repos?per_page=5&sort=created:asc&client_id=${config.get(
          'githubClientId'
        )}&client_secret=${config.get('githubSecret')}`),
        method: 'GET',
        headers: { 'user-agent': 'node.js' }
      };
  
      request(options, (error, response, body) => {
        if (error) console.error(error);
  
        if (response.statusCode !== 200) {
          return res.status(404).json({ msg: 'No Github profile found' });
        }
  
        res.json(JSON.parse(body));
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
module.exports=route