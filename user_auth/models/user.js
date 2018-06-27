/**
 * Import Node Modules
 */
const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
/**
 * Schema Setup
 */
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
userSchema.plugin(passportLocalMongoose)

/**
 * Export Data
 */
module.exports = mongoose.model("User", userSchema)