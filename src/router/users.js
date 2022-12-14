const router = require("express").Router();
const bcrypt = require("bcrypt");
const UserModel = require("../model/users");
const jwt = require("jsonwebtoken");

router.post("/register",async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(req.body.password,salt);

        const data = {
            name:req.body.name,
            email:req.body.email,
            password:hashedPass,
        }

        const user = await UserModel.create(data);
        res.status(201).json(user);
    }
    catch(e){
        res.status(406).json({
            status:"failed",
            message: e.message
        })
    }
})

router.post("/login",async(req,res)=>{
    try{
        const result = await UserModel.findOne({email:req.body.email});
        if(!result){
            res.status(401).json({
                status : "invalid",
                message:"user not found",
            })
        } else if(await bcrypt.compare(req.body.password,result.password)){
            
            const userId = await result._id.toString();
            const user = {user : userId};
            // console.log(user);
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_KEY)
            res.json({
                status : "success",
                token : accessToken
            })
        }else{
            res.status(401).json({
                status : "invalid",
                message:"incorrect password"
            })
        }
    }
    catch(e){
        // console.log(e);
        res.status(406).json({
            status:"failed",
            message: e.message
        })
    }
})



module.exports = router;

