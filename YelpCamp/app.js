/**
 * Import Node Modules
 */
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
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
mongoose.connect("mongodb://localhost/yelpcamp")
/**
 * Seed Database
 */
var seedDB = require("./seeds")
seedDB();
/**
 * Schema Setup
 */
var Campground = require("./models/campground")
/**
 * Default 
 */
// Campground.create({
//     name: "Cat Dog Campgrounds",
//     image: "https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104497f9c77ea6e8b5ba_340.jpg",
//     description: "This is just another campground but with cat dog themed areas."
// }, function (err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("New Campground.")
//         console.log(campground)
//     }
// })
/**
 * Setup routes
 */
app.get("/", function (req, res) {
    res.render("home");
});
app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds", {
                campgrounds: campgrounds
            });
        }
    })
});
app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description
    var newCampground = {
        name: name,
        image: image,
        description: description
    };
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log("Added campground");
            res.redirect("/campgrounds");
        }
    })
});
app.get("/campgrounds/new", function (req, res) {
    res.render("newCampground");
});
app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            res.render("showCampground", {
                campground: foundCampground
            });
        }
    });
});
/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!");
});
console.log("Go to http://localhost:8080 to see running app.");