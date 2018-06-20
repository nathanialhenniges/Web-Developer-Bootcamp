/**
 * Import Node Modules
 */
const express = require('express');
const bodyParser = require("body-parser");
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
 * Campgrounds array
 */
var campgrounds = [{
        name: "Salmon Creek",
        image: "https://pixabay.com/get/e834b70c2cf5083ed1584d05fb1d4e97e07ee3d21cac104497f9c478a6e5b1ba_340.jpg"
    },
    {
        name: "Catfish Party Creek",
        image: "https://pixabay.com/get/e136b60d2af51c22d2524518b7444795ea76e5d004b014439cf5c078afe9b7_340.jpg"
    }, {
        name: "Cat Dog Campgrounds",
        image: "https://pixabay.com/get/e831b20628f2003ed1584d05fb1d4e97e07ee3d21cac104497f9c478a6e5b1ba_340.jpg"
    }
];
/**
 * Setup routes
 */
app.get("/", function (req, res) {
    res.render("home");
})
app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", {
        campgrounds: campgrounds
    });
})
app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
    };
    campgrounds.push(newCampground)
    res.redirect("/campgrounds")
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