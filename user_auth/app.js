/**
 * Import Node Modules
 */
const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user");
/**
 * Setup Express
 */
const app = express();
/**
 * Set global Viewnode 
 */
app.set("view engine", "ejs");
/**
 * Setup Body parser
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
/**
 * Setup Expeess session
 */
app.use(require("express-session")({
    secret: "Kappa is the best meme ever",
    resave: false,
    saveUninitialized: false
}))
/**
 * Setup Express to use passport
 */
app.use(passport.initialize());
app.use(passport.session());
/**
 * Passport Stuff
 */
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
/**
 * Connectto Mongo database
 */
mongoose.connect("mongodb://localhost/authdemo")
/**
 * Setup routes
 */
app.get("/", function (req, res) {
    res.render("home");
});
app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});
/**
 * Auth Routes
 */
app.get("/register", function (req, res) {
    res.render("register");
})
app.post("/register", function (req, res) {
    req.body.password
    req.body.passport
    User.register(new User({
        username: req.body.username
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err)
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/secret")
        });
    });
});
app.get("/login", function (req, res) {
    res.render("login")
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) {});
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/")
});
/**
 * Check login middleware
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
};
/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!");
});
console.log("Go to http://localhost:8080 to see running app.");