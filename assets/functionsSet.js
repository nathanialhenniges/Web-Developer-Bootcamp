// isEven
function isEven(num) {
    return num % 2 === 0;
}
// factorial
function factorial(num) {
    var result = 1;
    for (var i = 2; i <= num; i++) {
        result * i;
    }
    return result;
}
// kebabtosnake
function kebabtoSnake (str) {
  var newStr = str.reaplace(/-/g, "_");
  return newStr;
}