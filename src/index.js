const app = require("./app.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

let port = 3000;


//config
dotenv.config()

console.log();
//connect to database.
mongoose.set("strictQuery",true);
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true ,useUnifiedTopology: true },(err)=>{
    console.log("connected to DB");
    if(err){
        console.log(err);
    }
})


//server listening to 3000.
app.listen(port,()=>console.log("server is running")); 