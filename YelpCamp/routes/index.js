/**
 * Import Node Modules and setup express router
 */
var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");
/**
 * Index Route
 */
router.get("/", function (req, res) {
    res.render("home");
});

/**
 * Auth Routes
 */
router.get("/register", function (req, res) {
    res.render("auth/register");
})
router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("auth/register");
        }
        passport.authenticate("local")(req, res, function () {
            res.flash("success", "Welcome to YelpCamp , " + user.username);
            res.redirect("/campgrounds");
        });
    });
});
/**
 * Login Routes
 */
router.get("/login", function (req, res) {
    res.render("auth/login");
})
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
    // if (successRedirect) {
    //     res.flash("success", "Welcome to back to YelpCamp , " + user.username);
    // } else {
    //     res.flash("error", "Something went wrong");
    // }
})
/**
 * Logout Routes
 */
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You have been logged out!")
    res.redirect("/campgrounds")
})
module.exports = router;