/**
 * Setup Lib
 */
const express = require("express");
const bodyParser = require("body-parser")
var app = express();
/**
 * Assets
 */
app.use(express.static('public'))
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}))
/**
 * Setup routes
 */
var friends = ["Holy", "Nathan", "Bob", "Tony", "Steven"]
app.get("/", function (req, res) {
    res.render("home");
})
app.get("/friends", function (req, res) {
    res.render("friends", {
        friends: friends
    })

})
app.post("/addfriend", function (req, res) {
    var newFriend = req.body.newfriend;
    friends.push(newFriend)
res.redirect("/friends")
})
/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!")
});
console.log("Go to http://localhost:8080 to see running app.")