const express = require("express");
var app = express();


/**
 * R
 */

app.get("/", function (req, res) {
    res.send("Hi there!")
})
app.get("/bye", function (req, res){
    res.send("Bye")
})
app.get("/dog", function (req, res) {
    res.send("Meow!")
})
app.get("*", function(req, res) {
    res.send("You are a star!")
})
/**
 * Start server
 */
app.listen("8080", "127.0.0.1", function () {
    console.log("Server has started!")
});
console.log("Go to http://127.0.0.1:8080")