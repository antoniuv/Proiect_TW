const taskList = document.getElementById("task-list");
const addTaskForm = document.getElementById("add-task-form");
const taskInput = document.getElementById("task-input");

addTaskForm.addEventListener("submit", (event) => {
	event.preventDefault();
	if (taskInput.value) {
		addTask(taskInput.value);
		taskInput.value = "";
	}
});

function addTask(taskText) {
	const taskItem = document.createElement("li");
	const taskCheckbox = document.createElement("input");
	taskCheckbox.type = "checkbox";
	taskCheckbox.className = "checkbox";
	const taskTextSpan = document.createElement("span");
	taskTextSpan.innerText = taskText;
	const taskDeleteButton = document.createElement("button");
	taskDeleteButton.innerText = "Delete";
	taskDeleteButton.className = "delete-button";
	taskItem.appendChild(taskCheckbox);
	taskItem.appendChild(taskTextSpan);
	taskItem.appendChild(taskDeleteButton);
	taskList.appendChild(taskItem);

	taskCheckbox.addEventListener("change", () => {
		if (taskCheckbox.checked) {
			taskItem.classList.add("completed");
		} else {
			taskItem.classList.remove("completed");
		}
	});

	taskDeleteButton.addEventListener("click", () => {
		taskList.removeChild(taskItem);
	});
}
