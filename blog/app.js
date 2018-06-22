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
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!");
});
console.log("Go to http://localhost:8080 to see running app.");