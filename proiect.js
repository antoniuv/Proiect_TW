const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

let tasks = [];

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("task-item");
    if (task.completed) {
    listItem.classList.add("completed");
    }
    listItem.innerHTML = 
    `<div class="date">${task.date}</div>
    <div class="priority ${task.priority}"> ${task.priority} </div>
     <div class="name">${task.name}</div>
      <button class="complete-btn" data-index="${index}"> ${task.completed ? "Undo" : "Complete"} </button>
       <button class="delete-btn" data-index="${index}"> Delete </button>`;
    taskList.appendChild(listItem);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function sortTasksByPriority(tasks) {
        return tasks.sort(function(a, b) {
          var priorityA = a.priority;
          var priorityB = b.priority;
          if (priorityA === "low") {
            priorityA = 3;
          } else if (priorityA === "medium") {
            priorityA = 2;
          } else if (priorityA === "high") {
            priorityA = 1;
          }
          if (priorityB === "low") {
            priorityB = 3;
          } else if (priorityB === "medium") {
            priorityB = 2;
          } else if (priorityB === "high") {
            priorityB = 1;
          }
          return priorityA - priorityB;
        });
      }
      
    function addTask(event) {
        event.preventDefault();
        const taskNameInput = document.getElementById("task-name");
        const taskPriorityInput = document.getElementById("task-priority");
        const taskName = taskNameInput.value;
        const taskPriority = taskPriorityInput.value;
        if (taskName.trim() === "") {
        alert("Please enter a task name");
        return;
        }
        const date = new Date();
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const newTask = {
        name: taskName,
        priority: taskPriority,
        completed: false,
        date: formattedDate
        };
        tasks.push(newTask);
        taskNameInput.value = "";
        taskPriorityInput.selectedIndex = 0;
        tasks = sortTasksByPriority(tasks);
        renderTasks();
        }
        
        function completeTask(event) {
        const button = event.target;
        const index = button.dataset.index;
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
        }
        
        function deleteTask(event) {
        const button = event.target;
        const index = button.dataset.index;
        tasks.splice(index, 1);
        renderTasks();
        setTimeout(() => { alert("Task deleted") } , 1000);

        }
        
        function init() {
            const storedTasks = JSON.parse(localStorage.getItem("tasks"));
            if (storedTasks) {
              tasks = storedTasks;
              renderTasks();
            }
          }

        taskForm.addEventListener("submit", addTask);
        taskList.addEventListener("click", event => {
        if (event.target.classList.contains("complete-btn")) {
        completeTask(event);
        } else if (event.target.classList.contains("delete-btn")) {
        deleteTask(event);
        }
        });
        
        init();
        
