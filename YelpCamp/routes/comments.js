/**
 * Import Node Modules and setup express router
 */
var express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");
/**
 * Comments Routes
 */
router.get("/new", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", {
                campground: campground
            })
        }
    })
});
router.post("/", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    /**
                     * Add user name and ID to comment
                     */
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment)
                    res.redirect("/campgrounds/" + campground._id)
                }
            });
        }
    });
});
/**
 * Check if user loggedin
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
};
module.exports = router;