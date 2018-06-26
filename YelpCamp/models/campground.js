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
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

/**
 * Export Data
 */
module.exports = mongoose.model("Campground", campgroundSchema)