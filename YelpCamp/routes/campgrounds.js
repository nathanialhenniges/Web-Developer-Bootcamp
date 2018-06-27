/**
 * Import Node Modules and setup express router
 */
var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground");
/**
 * Campground Routes
 */
router.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", {
                campgrounds: campgrounds
            });
        }
    })
});
router.post("/campgrounds", function (req, res) {
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
router.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});
router.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
});
module.exports = router;