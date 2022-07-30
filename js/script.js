

const todoInput = document.querySelector('.todo__input');
const todoButton = document.querySelector('.todo__button');
const todoList = document.querySelector('.todo__list');
const todoFilter = document.querySelector('.todo__filter');
const todoSelect = document.querySelector('.todo__select');
// const filterOption = document.querySelector('.todo__select');



document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
todoFilter.addEventListener('click', filterActive)
todoFilter.addEventListener('click', filterTodo)



function filterActive() {
	todoSelect.classList.toggle('active')
}

function addTodo(event){
	event.preventDefault();

	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo__item");

	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add = ("todo__title");
	todoDiv.appendChild(newTodo);

	saveLockalTodos(todoInput.value)

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

	// filterTodo();
}

function deleteCheck(e){
	const item = e.target;

	if (item.classList[1] === "todo__button-list_trash") {
		const todo = item.parentElement;

		todo.classList.add("fall")
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', function(){
			todo.remove();
		});
	}

  if(item.classList[1] === "todo__button-list_complete"){
		const todo = item.parentElement;
		todo.classList.toggle('completed')
	};
}

function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach(function(todo){
		switch(e.target.value){
			case "all":
				todo.style.display = 'flex';
				break;
			case "completed":
			if(todo.classList.contains('completed')){
				todo.style.display = 'flex';
			}else{
				todo.style.display = "none";
			};
			break;
			case "uncompleted":
			if(!todo.classList.contains('completed')){
				todo.style.display = 'flex';
			}else{
				todo.style.display = "none";
			}
			break;
		}
	})
}

function checkLockalTodos(){
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
}

function saveLockalTodos(todo){
	checkLockalTodos();
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
	checkLockalTodos();
	todos.forEach(function(todo) {
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo__item");
	
		const newTodo = document.createElement("li");
		newTodo.innerText = todo;
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
	})
}

function removeLocalTodos(todo){
	checkLockalTodos();
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOF(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}