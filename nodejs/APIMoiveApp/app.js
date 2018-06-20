/**
 * Setup Lib
 */
const express = require("express");
const request = require('request')

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
app.get("/results", function (req, res) {
    var searchMovie = req.query.searchMovie
    request(`https://www.omdbapi.com/?s=${searchMovie}&apikey=1234567`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            res.render("results", {
                data: data
            })
        }
    });
});
/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!")
});
console.log("Go to http://localhost:8080 to see running app.")