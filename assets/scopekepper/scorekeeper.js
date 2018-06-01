var p1Button = document.getElementById("p1");
var p2Button = document.getElementById("p2");
var resetButton = document.getElementById("reset");
var p1Display = document.getElementById("p1Display");
var p2Display = document.getElementById("p2Display");
var numInput = document.querySelector("input[type='number']");
var winningScoreDisplay = document.getElementById("winningScore");
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;

p1Button.addEventListener("click", function () {
    if (!gameOver) {
        p1Score++;
        if (p1Score === winningScore) {
            gameOver = true;
            p1Display.classList.add("winner")
        }
        p1Display.textContent = p1Score
    }
})
p2Button.addEventListener("click", function () {
    if (!gameOver) {
        p2Score++;
        if (p2Score === winningScore) {
            p2Display.classList.add("winner")
            gameOver = true;
        }
    }
    p2Display.textContent = p2Score
})

function reset() {
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = p1Score
    p2Display.textContent = p2Score
    p1Display.classList.remove("winner")
    p2Display.classList.remove("winner")
    gameOver = false;
}
numInput.addEventListener("change", function () {
    winningScoreDisplay.textContent = this.value;
    winningScore = Number(this.value)
    reset()
})
resetButton.addEventListener("click", function () {
    reset()
})