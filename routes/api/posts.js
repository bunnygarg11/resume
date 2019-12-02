const express=require("express")
const route=express.Router()
const {check,validationResult}=require("express-validator")
const User=require("../../models/User")
const Post=require("../../models/Posts")
const profile=require("../../models/Profile")
const auth=require("../../middlewares/auth")


route.get("/",auth,async(req,res)=>{
    try{const post=await Post.find().sort({date:-1})
    res.json(post)}catch(err){
        console.log(err.message)
        res.status(500).send("server error")
    }

})
route.get("/:id",auth,async(req,res)=>{
    try{const post=await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({msg:"No post found"})
        }
    res.json(post)}catch(err){
        console.log(err.message)
        if(err.kind=="ObjectId") return res.status(400).json({msg:"No post found"})
        res.status(500).send("server error")
    }

})

route.post("/",[
    auth,
    check("text","Text is required").not().isEmpty()
],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const user=await User.findById(req._id)
        const newPost={
            user:req._id,
            text:req.body.text,
            name:user.name,
            avatar:user.avatar
        }
        const post=new Post(newPost)
        await post.save()
        res.json(post)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("server error")
        
    }
})
route.delete('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check for ObjectId format and post
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      // Check user
      if (post.user.toString() !== req._id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await post.remove();
  
      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  })
  route.put("/like/:id",auth,async(req,res)=>{
     
      try {
        const post=await Post.findById(req.params.id)
        if(post.likes.filter(like=>like.user.toString()===req._id).length>0){
            return res.status(400).json({msg:"User already had liked"})
        }
        post.likes.unshift({user:req._id})
        await post.save()
        res.json(post.likes)
          
      } catch (err) {
          console.log(err.message)
          res.status(500).send("server error")
          
      }
  })

  route.put('/unlike/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has already been liked
      if (
        post.likes.filter(like => like.user.toString() === req._id).length ===
        0
      ) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }
  
      // Get remove index
      const removeIndex = post.likes
        .map(like => like.user.toString())
        .indexOf(req._id);
  
      post.likes.splice(removeIndex, 1);
  
      await post.save();
  
      res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // @route    POST api/posts/comment/:id
  // @desc     Comment on a post
  // @access   Private
  route.post(
    '/comment/:id',
    [
      auth,
      [
        check('text', 'Text is required')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req._id).select('-password');
        const post = await Post.findById(req.params.id);
  
        const newComment = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        };
  
        post.comments.unshift(newComment);
  
        await post.save();
  
        res.json(post.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
  // @route    DELETE api/posts/comment/:id/:comment_id
  // @desc     Delete comment
  // @access   Private
  route.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Pull out comment
      const comment = post.comments.find(
        comment => comment.id === req.params.comment_id
      );
  
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
  
      // Check user
      if (comment.user.toString() !== req._id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      // Get remove index
      const removeIndex = post.comments
        .map(comment => comment.id)
        .indexOf(req.params.comment_id);
  
      post.comments.splice(removeIndex, 1);
  
      await post.save();
  
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports=route