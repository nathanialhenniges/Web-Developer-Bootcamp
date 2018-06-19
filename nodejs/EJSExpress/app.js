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
/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!")
});
console.log("Go to http://localhost:8080 to see running app.")