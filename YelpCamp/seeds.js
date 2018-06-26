/**
 * Import Node Modules
 */
const mongoose = require("mongoose");
/**
 * Schema Setup
 */
var Campground = require("./models/campground")
var Comment = require("./models/comment")
/**
 * Campground Data
 */
var campgroundData = [{
    name: "Sunny Rest",
    image: "https://pixabay.com/get/e834b70c2cf5083ed1584d05fb1d4e97e07ee3d21cac104496f0c179aeefb5ba_340.jpg",
    description: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."
}, {
    name: "Kappa World Park",
    image: "https://pixabay.com/get/eb3db30a29fd063ed1584d05fb1d4e97e07ee3d21cac104496f0c179aeefb5ba_340.jpg",
    description: "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring"
}, {
    name: "Dog World Campground",
    image: "https://pixabay.com/get/e136b60d2af51c22d2524518b7444795ea76e5d004b0144295f0c170a5edb7_340.jpg",
    description: "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line."
}]

/**
 * Clean database
 */
function seedDB() {
    /**
     * Remove Campgrounds
     */
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err)
        }
        console.log("Removed campgrounds.")
        /**
         * Add default campgrounds
         */
        campgroundData.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Added ${seed.name} campground.`)
                    /**
                     * Add comments to each campground
                     */
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function (err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created a new comment!");
                        }
                    })
                }
            })
        })
    });
}
/**
 * Export Data
 */
module.exports = seedDB