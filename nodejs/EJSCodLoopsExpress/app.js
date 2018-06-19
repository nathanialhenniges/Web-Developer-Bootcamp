/**
 * Setup Lib
 */
const express = require("express");
var app = express();
/**
 * Setup routes
 */

app.get("/", function (req, res) {
    res.render("home.ejs");
})
app.get("/fallinlovewith/:thing", function (req, res) {
    var thing = req.params.thing
    res.render("love.ejs", {
        thingVar: thing
    })
})
app.get("/posts", function (req, res) {
    var posts = [{
        title: "Post 1",
        author: "Joe John"
    }, {
        title: "Pet buddy",
        author: "Jenny John"
    }, {
        title: "My fav owner Colt",
        author: "Rusty"
    }]
    res.render("post.ejs", {
        posts: posts
    });
})
/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!")
});
console.log("Go to http://localhost:8080 to see running app.")