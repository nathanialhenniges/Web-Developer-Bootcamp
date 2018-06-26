/**
 * Import Node Modules
 */
const mongoose = require("mongoose");
/**
 * Schema Setup
 */
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Campground = mongoose.model("Campground", campgroundSchema)
/**
 * Export Data
 */
module.exports = Campground