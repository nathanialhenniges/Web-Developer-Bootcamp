/**
 * Setup Lib
 */
const express = require("express");
var app = express();

/**
 * Setup routes
 */

app.get("/", function (req, res) {
    res.send("Hi there! Welcome to my exercise.")
})
app.get("/speak/:animal", function (req, res) {
    var animal = req.params.animal.toUpperCase();
    if (animal === "PIG") {
        res.send("The pig says 'Oink`")
    }
    if (animal === "COW") {
        res.send("The cow says 'Moo'")
    }
    else if (animal === "DOG") {
        res.send("The dog says 'Woof Woof'")
    }
    else {
        res.send("Sorry that's not a vaild animal.  Please use either pig,cow, and or dog.")

    }
})
app.get("*", function(req, res) {
    res.send("Sorry page not found...  What are you doing with you life.")
})
/**
 * Start server
 */
app.listen("8080", function () {
    console.log("Server has started!")
});
console.log("Go to http://127.0.0.1:8080 to see running app.")