var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo")
var User = require("./models/user")
var Post = require("./models/post")
// User.create({
//     email: "mrdemonwolf@outlook.com",
//     name: "Bob"
// })
Post.create({
        title: "Apples part 4.",
        content: "fefefeegggegergegeewguigeuiogeioiuohfegwiohegiohnegin"
    },
    function (err, post) {
        User.findOne({
            email: "mrdemonwolf@outlook.com"
        }, function (err, foundUser) {
            if (err) {
                console.log(err)
            } else {
                foundUser.posts.push(post);
                foundUser.save(function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(data)
                    } 
                })
            }
        })
    })
// User.findOne({email: "mrdemonwolf@outlook.com"}).exec(function (err, user) {
// if(err) {
//     console.log(err)
// }else {
//     console.log(user)
// }
// })