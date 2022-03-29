const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication")
const Post = require("../module/post.module");
const authorization = require("../middleware/authorization")


router.get("",authentication,async(req,res)=>
{
    try {
        const postdata = await Post.find().lean().exec();
        return res.status(200).send({postdata:postdata})
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})


router.post("",authentication,authorization(["admin","sellar"]),async(req,res)=>
{
    req.body.userId = req.user._id;
    console.log(req.user._id,"userId")
    try {
        const postdata = await Post.create(req.body);

        console.log(postdata,"rajdalkjflas")
        return res.status(200).send({postdata:postdata})
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})

router.patch("/:id",authentication,authorization(["admin","sellar"]),async(req,res)=>
{

    try {
       var d = await Post.find().lean().exec()
       console.log(d,"kdjfakljdlkfjalkjdflkjalksdf")

        console.log(req.params.id)
        var postdata = await Post.findOneAndUpdate({userId:req.params.id},req.body,{new:true});
        console.log(postdata,"dd")
        return res.status(200).send({postdata:postdata})
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})

router.delete("/:id",authentication,authorization(["admin","sellar"]),async(req,res)=>
{
    // req.body.userId = req.user._id;
    try {
        const postdata = await Post.findOneAndDelete({userId:req.params.id});
        return res.status(200).send({postdata:postdata})
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})


module.exports = router
