function echo(string, number) {
    for (var i = 0; i < number; i++) {
        console.log(string)
    }
}
echo("Echo!!! ", 10)
echo("Tater Tots", 3)

function average(scores) {
    var total = 0
    scores.forEach(scores => {
        total += scores
    });
    var avg = total / scores.length
    return Math.round(avg)
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));
var score2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(score2));