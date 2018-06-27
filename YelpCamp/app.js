/**
 * Import Node Modules
 */
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    seedDB = require("./seeds");
/**
 * Import routes
 */
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");

/**
 * Setup Express
 */
const app = express();
/**
 * Assets
 */
app.use(express.static(__dirname + "/public"));;
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
 * Connectto Mongo database
 */
mongoose.connect("mongodb://localhost/yelpcamp");
/**
 * Seed Database
 */
seedDB();
/**
 * Passport Config
 */
app.use(require("express-session")({
    secret: "Once again Kappa FTW",
    resave: false,
    saveUninitialized: false
}));
/**
 * Setup express to use passport
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
 * Add to all routes
 */
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})
/**
 * Express use routes
 */
app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!");
});
console.log("Go to http://localhost:8080 to see running app.");