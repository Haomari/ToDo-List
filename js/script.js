

const todoInput = document.querySelector('.todo__input');
const todoButton = document.querySelector('.todo__button');
const todoList = document.querySelector('.todo__list')


todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)


function addTodo(event){
	event.preventDefault();

	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo__item");

	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add = ("todo__title");
	todoDiv.appendChild(newTodo);

	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class = "fas fa-check"></i>';
	completedButton.classList.add("todo__button-list");
	completedButton.classList.add("todo__button-list_complete");
	todoDiv.appendChild(completedButton);

	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
	trashButton.classList.add("todo__button-list");
	trashButton.classList.add("todo__button-list_trash");
	todoDiv.appendChild(trashButton);

	todoList.appendChild(todoDiv);

	todoInput.value = "";
}

function deleteCheck(e){
	const item = e.target;
	// console.log("2")

	if (item.classList[1] === "todo__button-list_trash") {
		const todo = item.parentElement;
		todo.remove()
	}

  if(item.classList)
}