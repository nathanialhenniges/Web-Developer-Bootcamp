// Create SecretNumber
var secretNumber = 4;
// Ask user for guess
var stringGuess = prompt("Guess a number!");
var guess =Number(stringGuess);
// check if guess is right
if (guess === secretNumber) {
    alert("You got it right!");
}
// otherwise you check if higher
else if (guess > secretNumber) {
    alert("Your number is too high,  Please try again!");
}
// otherwise you chec k if lower
else {
    alert("Your number is too low,  Please try again!");
}