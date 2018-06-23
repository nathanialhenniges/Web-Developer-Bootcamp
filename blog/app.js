/**
 * Import Node Modules
 */
const express = require('express'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");
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
 * Setup method override
 */
app.use(methodOverride("_method"))
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
    });
});
app.post("/blogs", function (req, res) {
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs")
        }
    });
});
app.get("/blogs/new", function (req, res) {
    res.render("new")
});
app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect('/blogs')
        } else {
            res.render("show", {
                blog: foundBlog
            })
        }
    });
});
app.get("/blogs/:id/edit", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {
                blog: foundBlog
            });
        }
    });
});
app.put("/blogs/:id", function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (error, updatedBlog) {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id)
        }
    });
});
app.delete("/blogs/:id", function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (error) {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
})
/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!");
});
console.log("Go to http://localhost:8080 to see running app.");