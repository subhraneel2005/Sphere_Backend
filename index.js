const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const uri = process.env.MONGO_URI;

mongoose.connect(uri)

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB Cloud connected successfully")
})

//GET ROUTE

app.get("/getPosts", (req,res) => {
    res.send("All Posts")
})

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
});

