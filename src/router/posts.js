
const router = require("express").Router();
const postModel = require("../model/posts");
const PostModel = require("../model/posts");

router.get("/",async(req,res)=>{
    try{
        const posts = await postModel.find();
        res.json(posts);
    }
    catch{

    }
})
router.post("/",async(req,res)=>{
    try{
        console.log(req.user);
        const templet = {
            ...req.body,
            user : req.user.user,
        }
        const post  = await postModel.create(templet);
        res.status(201).json(post);
    }
    catch(e){
        res.status(400).json({
            status : "failed",
            message :e.message
        })
    }
})
router.route("/:id")
.put(async(req,res)=>{
    try{
        const post = await postModel.updateOne({_id : req.params.id},{...req.body});
        if(post.matchedCount !== 0){
            res.status(201).json({
                status : "success",
            })
        }else{
            res.status(406).json({
                status : "Not accepted",
                message:"id not found"
            })
        }

    }
    catch(e){
        res.status(500).json({
            status : "failed",
            message:e.message
        })
    }
})
.delete(async(req,res)=>{
    try{
        const del = await PostModel.deleteOne({_id:req.params.id});
        if(del.deletedCount !== 0){
            res.status(201).json({
                status : "deleted success"
            })
        }else{
            res.status(406).json({
                status : "Not accepted",
                message : "id not found"
            })
        }

    }
    catch(e){
        res.status(500).json({
            status : "failed",
            message : e.message 
        })
    }
    
})


module.exports = router;