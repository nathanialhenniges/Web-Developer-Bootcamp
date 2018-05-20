var movie = [{
        title: "Game Night",
        hasWatched: true,
        rating: 5
    },
    {
        title: "My Little Pony: The Movie",
        hasWatched: false,
        rating: 4.5
    },
    {
        title: "Zootopia",
        hasWatched: true,
        rating: 5
    },
    {
        title: "Deadpool",
        hasWatched: false,
        rating: 3.5
    }
]
movie.forEach(function (movie) {
    var result = "You have ";
    if (movie.hasWatched) {
        result += "watched ";
    } else {
        result += "not seen ";
    }
    result += "\"" + movie.title + "\" -";
    result += movie.rating + " stars";

    console.log(result)
})