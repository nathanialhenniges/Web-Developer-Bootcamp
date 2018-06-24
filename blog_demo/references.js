var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo")

var postSchema = new mongoose.Schema({
    title: String,
    content: String
})
var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema]
})
var User = mongoose.model("User", userSchema);