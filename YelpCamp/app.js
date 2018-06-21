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
mongoose.connect("mongodb://localhost/yelpcamp")
/**
 * Schema Setup
 */
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
})

var Campground = mongoose.model("Campground", campgroundSchema)

/**
 * Default 
 */
// Campground.create({
//     name: "Cat Dog Campgrounds",
//     image: "https://pixabay.com/get/e831b20628f2003ed1584d05fb1d4e97e07ee3d21cac104497f9c478a6e5b1ba_340.jpg"
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
})
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
})
app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
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
    res.render("newCampground")
})
/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!");
});
console.log("Go to http://localhost:8080 to see running app.");