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
});
/**
 * Export Data
 */
module.exports = mongoose.model("Comment", commentSchema)