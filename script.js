const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    if (tasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No tasks available. Add a task!";
        emptyMessage.classList.add("empty-message");
        taskList.appendChild(emptyMessage);
        return;
    }
    // Render each task
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed");
        }

        // Create task text element
        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        // Create actions container
        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        // Create time element
        const taskTime = document.createElement("small");
        taskTime.textContent = `${task.date}`;
        taskTime.className = "task-time";
        // completeButton
        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Done";
        completeButton.className = "btn complete-btn";
        completeButton.onclick = () => toggleComplete(index);

        //editButton
        const editButton = document.createElement("button");
        editButton.innerHTML = "<i class='fas fa-edit'></i>";
        editButton.className = "btn edit-btn";
        editButton.onclick = () => editTask(index);

        // deleteButton
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
        deleteButton.className = "btn delete-btn";
        deleteButton.onclick = () => deleteTask(index);

        actions.appendChild(completeButton);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(taskTime); // Add time display here
        li.appendChild(actions);
        taskList.appendChild(li);
    });
}

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const now = new Date();
        const timeString  = now.toLocaleString();
        tasks.push({ 
            text: taskText, 
            completed: false, 
            date: timeString  
        });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    }
}
// toggleComplete function
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}
// Edit task function
function editTask(index) {
    const newTaskText = prompt("Edit task:", tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText.trim();
        saveTasks();
        renderTasks();
    }
}
// Delete task function with confirmation
function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
