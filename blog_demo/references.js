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
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
})
var User = mongoose.model("User", userSchema);

// User.create({
//     email: "mrdemonwolf@outlook.com",
//     name: "Bob"
// })
// Post.create({
//         title: "Apples part 3.",
//         content: "nfjjelngegeglkgekeglkneggenngeegegknklgelgenkgelnknlegka"
//     },
//     function (err, post) {
//         User.findOne({
//             email: "mrdemonwolf@outlook.com"
//         }, function (err, foundUser) {
//             if (err) {
//                 console.log(err)
//             } else {
//                 foundUser.posts.push(post);
//                 foundUser.save(function (err, data) {
//                     if (err) {
//                         console.log(err)
//                     } else {
//                         console.log(data)
//                     }
//                 })
//             }
//         })
//     })
User.findOne({email: "mrdemonwolf@outlook.com"}).populate("posts").exec(function (err, user) {
if(err) {
    console.log(err)
}else {
    console.log(user.email)
}
})