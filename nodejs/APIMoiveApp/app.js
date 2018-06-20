/**
 * Setup Lib
 */
const express = require("express");
const reqquest = require('request')

var app = express();
/**
 * Assets
 */
app.use(express.static('public'))
app.set("view engine", "ejs");
/**
 * Setup routes
 */
app.get("/", function (req, res) {
    res.render("home");
})

/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!")
});
console.log("Go to http://localhost:8080 to see running app.")