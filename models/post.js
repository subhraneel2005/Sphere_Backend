const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    id: {
        type: String,
        default: () => Math.random().toString(36).substr(2,9)
    },
    postTitle: String,
    postDescription: String,
    postCategory: String,
    postImage: {
        type: String,
        required: false
    },
    postVideo: {
        type: String,
        required: false
    },
    postTime: {
        type: String,
        default: () => new Date().toLocaleTimeString('en-US', { hour12: false })
    },
    postDate: {
        type: String,
        default: () => new Date().toLocaleDateString('en-US')
    },
    adminName: String,
    adminImg: String,
    adminUsername: String,
})

module.exports = mongoose.model("Posts", postSchema);