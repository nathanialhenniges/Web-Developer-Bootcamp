const request = require("request");
request('https://www.google.com', function (err, res, body) {
    if (!err && res.statusCode == 200) {
        console.log(body)
    }
})