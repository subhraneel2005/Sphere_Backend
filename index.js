const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Posts = require("./models/post");
require("dotenv").config();

const app = express();

const PORT = 3000;

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//MongoDB Cloudb Cluster Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Cloud connected successfully")
})


//REST APIs

//Create a Post
app.post('/api/createPost', async(req,res) => {
    const post = new Posts(req.body);

    try {
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//Get all Posts
app.get('/api/getAllPosts', async(req,res) => {

    try {
        const allPosts = await Posts.find();
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//Update Post by id
app.put('/api/updatePost/:id',async(req,res) => {
    try {
        
        const updatedPost = await Posts.findByIdAndUpdate(req.params._id, req.body, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//Delete Post by id
app.delete('/api/deletePost/:id', async(req,res) => {
    try {
        await Posts.findByIdAndDelete(req.params._id);
        res.status(200).json("Post has been deleted");
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})




app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
});

