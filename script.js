// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.querySelector('.task-list');
const allFilter = document.getElementById('allFilter');
const completedFilter = document.getElementById('completedFilter');
const pendingFilter = document.getElementById('pendingFilter');
const sortNewestBtn = document.getElementById('sortNewestBtn');

// Load tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks in the list
function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTaskStatus(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

// Add new task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
});

// Toggle task completion
function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Save tasks to LocalStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter tasks
allFilter.addEventListener('click', () => renderTasks());
completedFilter.addEventListener('click', () => renderTasks(tasks.filter(task => task.completed)));
pendingFilter.addEventListener('click', () => renderTasks(tasks.filter(task => !task.completed)));

// Sort tasks by newest
sortNewestBtn.addEventListener('click', () => {
    renderTasks([...tasks].reverse());
});

// Initial render
renderTasks();
