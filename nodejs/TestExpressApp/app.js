const express = require("express");
var app = express();


/**
 * R
 */

app.get("/", function (req, res) {
    res.send("Hi there!")
})
app.get("/bye", function (req, res) {
    res.send("Bye")
})
app.get("/dog", function (req, res) {
    res.send("Meow!")
})
app.get("/r/:subredditName", function (req, res) {
    var subreddit = req.params.subredditName
    res.send("Welcome to the " + subreddit.toUpperCase() + " reddit")
})
app.get("/r/:subredditName/commands/:id/:title", function (req, res) {
    res.send("Welcome to the comments page.")
})
app.get("*", function (req, res) {
    res.send("You are a star!")
})
/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!")
});
console.log("Go to http://127.0.0.1:8080")