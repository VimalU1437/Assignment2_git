const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const UserModel = require("./model/users");

//middleware.
app.use(bodyParser.json());

app.post("/register",async (req,res)=>{
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

app.post("/login",async(req,res)=>{
    try{
        const user = await UserModel.findOne({email:req.body.email});
        if(!user){
            res.status(401).json({
                status : "invalid",
                message:"user not found",
            })
        } else if(await bcrypt.compare(req.body.password,user.password)){
            res.json({
                status : "success",
            })
        }else{
            res.status(401).json({
                status : "invalid",
                message:"incorrect password"
            })
        }
    }
    catch(e){
        res.status(406).json({
            status:"failed",
            message: e.message
        })
    }
})

module.exports = app;