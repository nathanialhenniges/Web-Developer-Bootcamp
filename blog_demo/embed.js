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

// var newUser = new User({
//     name: "Nathan Henniges",
//     email: "demonwolf@demonwolfdev.com"
// })
// newUser.posts.push({
//     title: "How to apples",
//     content: "Kappa Apples are life"
// })
// newUser.save(function(err,user){
//     if(err) {
//         console.log(err)
//     }else {
//         console.log(user)
//     }
// })

// var newPost = new Post({
//     title: "Apples?",
//     content: "Are apples even real!!!!"
// })
// newPost.save(function (err, post) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(post)
//     }
// })

User.findOne({
    name: "Nathan Henniges"
}, function (err, user) {
    if (err) {
        console.log(err)
    } else {
        console.log(user)
        user.posts.push({
            title: "Hello World of Apples",
            content: "I HATE APPLES the end."
        });
        user.save(function (err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
})