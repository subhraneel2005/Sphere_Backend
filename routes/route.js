const express = require('express');
const Posts = require("../models/post");
const router = express.Router();

//Create a Post
router.post('/createPost', async(req,res) => {
    const post = new Posts(req.body);

    try {
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//Get all Posts
router.get('/getAllPosts', async(req,res) => {

    try {
        const allPosts = await Posts.find();
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

