/**
 * Import Node Modules
 */
const mongoose = require("mongoose");
/**
 * Schema Setup
 */
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
})

var Comment = mongoose.model("Comment", commentSchema)
/**
 * Export Data
 */
module.exports = Comment