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
            console.log(err);
            return res.render("auth/register");
        }
        passport.authenticate("local")(req, res, function () {
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
}), function (req, res) {})
/**
 * Logout Routes
 */
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You have been logged out!")
    res.redirect("/campgrounds")
})
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