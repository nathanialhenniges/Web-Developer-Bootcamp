console.log("Printing numbers between -10 and 19");
var counter = -10
while (counter < 20) {
    console.log(counter);
    counter++;
}

console.log("Printing even numbers between 10 and 40");
var counter2 = 10
while (counter2 <= 40) {
    if (counter2 % 2 === 0) {
        console.log(counter2);
    }
    counter2 += 1;
}
console.log("Printing odd numbers between 300 and 333");
var counter3 = 300;
while (counter3 <= 333) {
    if (counter3 % 2 !== 0) {
        console.log(counter3);
    }
    counter3 += 1;
}
console.log("Printing numbers divisable by 5 and 3 between 5 and 50");
var counter4 = 5;
while (counter4 <= 50) {
    if (counter4 % 5 === 0 && counter4 % 3 === 0) {
        console.log(counter4);
    }
    counter4 += 1;
}