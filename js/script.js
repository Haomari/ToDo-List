'use strict';

class TODOItem {
  constructor(text, status) {
    this.text = text;
    this.status = status;
  }
}




const todoInput = document.querySelector('.todo__input');
const todoButton = document.querySelector('.todo__button');
const todoList = document.querySelector('.todo__list');
const todoFilter = document.querySelector('.todo__filter');
const todoSelect = document.querySelector('.todo__select');

const UNCOMPLETED = "UNCOMPLETED";
const COMPLETED = "COMPLETED";

let todos = [];




document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
todoFilter.addEventListener('click', filterActive)
todoFilter.addEventListener('click', filterTodo)




function filterActive() {
	todoSelect.classList.toggle('active')
}

function checkLocalTodos() {

	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
}

function addTodo(event) {
	event.preventDefault();
	if(!todoInput.value){
		alert("Please type some text")
	}else{
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo__item");

	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add = ("todo__title");
	todoDiv.appendChild(newTodo);

	saveLocalTodos(new TODOItem(todoInput.value, UNCOMPLETED));

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

	filterTodo(e);
	}
}

function deleteCheck(e) {
	const item = e.target;

	if (item.classList[1] === "todo__button-list_trash") {
		const todo = item.parentElement;

		todo.classList.add("fall")
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', function () {
			todo.remove();
		});
	}

	if (item.classList[1] === "todo__button-list_complete") {
		const todo = item.parentElement;
		todo.classList.toggle('completed')
		saveLocalTodos(new TODOItem(todo.children[0].innerText, COMPLETED));
	};
}

function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case "all":
				todo.style.display = 'flex';
				break;
			case "completed":
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = "none";
				};
				break;
			case "uncompleted":
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = "none";
				}
				break;
		}
	})
}


function saveLocalTodos(todo) {
	checkLocalTodos();
	const itemIndex = todos.findIndex((element, index) => {
		if (element.text === todo.text) {
			return true;
		}
	});
	if (itemIndex == -1) {
		todos.push(todo);
	} else {
		if (todos[itemIndex].status === COMPLETED) {
			todo.status = UNCOMPLETED;
		} else if (todos[itemIndex].status === UNCOMPLETED) {
			todo.status = COMPLETED;
		}
		todos[itemIndex] = todo;
	}
	localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() { 
	checkLocalTodos();
	todos.forEach(function (todo) {
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo__item");

		const newTodo = document.createElement("li");
		newTodo.innerText = todo.text;
		newTodo.classList.add = ("todo__title");
		if (todo.status === COMPLETED) {
			todoDiv.classList.toggle("completed");
		}
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

function removeLocalTodos(todo) {
	checkLocalTodos();
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}