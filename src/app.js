const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usersRoute = require("./router/users");
const postsRoute = require("./router/posts");
const jwt = require("jsonwebtoken");


//middleware.
app.use(bodyParser.json());

app.use("/",usersRoute);

app.use("/posts",authentication,postsRoute);

function authentication (req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader
    if(token === undefined){
        return res.sendStatus(401);
    };
    jwt.verify(token,process.env.ACCESS_TOKEN_KEY,(err,user)=>{
        
        if(err){
            return res.sendStatus(403);
        }
        
        req.user = user;
        next();
    })

}





module.exports = app;