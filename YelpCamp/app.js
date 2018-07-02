/**
 * Import Node Modules
 */
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    seedDB = require("./seeds");
/**
 * Defualt env
 */
var DATABASEURL = process.env.DATABASEURL || "mongodb://localhost/yelpcam";
var PORT = process.env.PORT || 8080;
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
mongoose.connect(DATABASEURL);
// mongoose.connect("mongodb://app:0W713yMm82eV8lAj@ds018248.mlab.com:18248/yelpcamp");
/**
 * Seed Database
 */
// seedDB();
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
 * Setup Method Override
 */
app.use(methodOverride("_method"));
/**
 * Setup Flash
 */
app.use(flash())

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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
/**
 * Express use routes
 */
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
/**
 * Start server
 */
app.listen(PORT, function () {
    console.log("Server has started!");
});
// app.listen(8080, function () {
//     console.log("Server has started!");
// });