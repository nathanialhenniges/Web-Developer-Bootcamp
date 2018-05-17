var todos = [];
var input = prompt("What would you like to do?");
while (input !== "quit") {
    if (input === "list") {
        listTodos()
    } else if (input === "new") {
        addTodo()
    } else if (input === "delete") {
        removeTodo()
    }
    input = prompt("What would you like to do?");
}

function listTodos() {
    console.log("############")
    todos.forEach(function (todo, i) {
        console.log(i + ": " + todo)
    });
    console.log("############")
}

function addTodo() {
    var newTodo = prompt("Enter new todo.");
    todos.push(newTodo);
}

function removeTodo() {
    var index = prompt("Enter index of todo to delete.")
    todos.splice(index, 1);
    console.log(index + " has been removed!")
}
console.log("Quiting app.")