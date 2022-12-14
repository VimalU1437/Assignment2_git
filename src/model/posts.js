const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:String
})

const postModel = mongoose.model("posts",postsSchema);

module.exports = postModel;