require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Posts = require("./models/post");


mongoose.connect(
    process.env.MONGO_URI
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("Connected to database");
});


const app = express();

app.use(cors());
app.use(bodyParser.json());


const PORT = 3000;
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

// Get current user's Posts
app.get('/api/getPosts', async (req, res) => {
    const adminName = req.headers.adminname; // or req.body.adminName

    try {
        // Find posts that match the adminName
        const posts = await Posts.find({ adminName });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
});


//Update Post by id
app.put('/api/updatePost/:_id',async(req,res) => {
    try {
        
        const updatedPost = await Posts.findByIdAndUpdate(req.params._id, req.body, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//Delete Post by id
app.delete('/api/deletePost/:_id', async(req,res) => {
    try {
        await Posts.findByIdAndDelete(req.params._id);
        res.status(200).json("Post has been deleted");
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//Get SinglePost by id
app.get('/api/post/:_id', async(req,res) => {
    try {
        const {_id} = req.params;

        const post = await Posts.findById(req.params._id);

        if(!post){
            res.status(400).json({message: "The Requested Post Was Not Found"});
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})




app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
});

