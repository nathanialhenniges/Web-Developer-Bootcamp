/**
 * Import Node Modules
 */
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");
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
 * Setup routes
 */
app.get("/", function (req, res) {
    res.render("home");
});
/**
 * Campground Routes
 */
app.get("/campgrounds", function (req, res) {
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
    res.render("campgrounds/new");
});
app.get("/campgrounds/:id", function (req, res) {
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
/**
 * Comments Routes
 */
app.get("/campgrounds/:id/comments/new", function (req, res) {
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
app.post("/campgrounds/:id/comments", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id)
                }
            });
        }
    });
});
/**
 * Auth Routes
 */
app.get("/register", function (req, res) {
    res.render("auth/register");
})
app.post("/register", function (req, res) {
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
app.get("/login", function (req, res) {
    res.render("auth/login");
})
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {})
/**
 * Login Routes
 */
/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!");
});
console.log("Go to http://localhost:8080 to see running app.");