/**
 * Import Node Modules
 */
const express = require('express'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
/**
 * Setup Express
 */
const app = express();
/**
 * Assets
 */
app.use(express.static('public'));
/**
 * Set global Viewnode 
 */
app.set("view engine", "ejs");
/**
 * Setup Body parser
 */
app.use(bodyParser.urlencoded({
    extended: true
}))
/**
 * Connectto Mongo database
 */
mongoose.connect("mongodb://localhost/blog")
/**
 * Database Schema
 */
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now()
    }
})
/**
 * Compile Model
 */
var Blog = mongoose.model("Blog", blogSchema);
/**
 * Create Test
 */
// Blog.create({
//     title: "Hello World",
//     image: "https://pbs.twimg.com/profile_images/779017316503781377/d6rPXCnC.jpg",
//     body: "Hello the whole world.  This is just a test"
// })
/**
 * Setup routes
 */
app.get("/", function (req, res) {
    res.redirect("/blogs")
});
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err)
        } else {
            res.render("index", {
                blogs: blogs
            })

        }
    })
});
app.get("/blogs/new" ,function (req,res){
    res.render("new")
})
app.post("/blogs", function(req,res) {
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            res.render("new");
        }else {
            res.redirect("/blogs")
        }
    })
})
/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!");
});
console.log("Go to http://localhost:8080 to see running app.");