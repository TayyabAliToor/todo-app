document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('add-task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const taskInput = document.getElementById('task');
    const dueDateInput = document.getElementById('due-date');
    const priorityInput = document.getElementById('priority');
    
    const taskValue = taskInput.value;
    const dueDateValue = dueDateInput.value;
    const priorityValue = priorityInput.value;

    if (taskValue && dueDateValue && priorityValue) {
        const newTask = { 
            text: taskValue, 
            completed: false, 
            dueDate: dueDateValue, 
            priority: priorityValue 
        };
        addTask(newTask);
        saveTaskToLocalStorage(newTask);
        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'low'; // Reset priority to default
    }
});

function addTask(task) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');

    // Create Checkbox for Completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onclick = () => {
        li.classList.toggle('completed');
        updateTaskInLocalStorage(task.text, checkbox.checked);
    };
    li.appendChild(checkbox);

    // Add task text
    const taskText = document.createElement('span');
    taskText.textContent = `${task.text} (Due: ${task.dueDate}, Priority: ${task.priority})`; // Include due date and priority
    li.appendChild(taskText);

    // Create Edit Button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(task, li);
    li.appendChild(editButton);

    // Create Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task, li);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}

function editTask(task, li) {
    const newTaskText = prompt('Edit task:', task.text);
    const newDueDate = prompt('Edit due date:', task.dueDate);
    const newPriority = prompt('Edit priority (low, medium, high):', task.priority);
    
    if (newTaskText && newDueDate && newPriority) {
        task.text = newTaskText;
        task.dueDate = newDueDate;
        task.priority = newPriority;

        li.querySelector('span').textContent = `${task.text} (Due: ${task.dueDate}, Priority: ${task.priority})`;
        updateTaskInLocalStorage(task.text, task.completed, task.dueDate, task.priority);
    }
}

function deleteTask(task, li) {
    if (confirm('Are you sure you want to delete this task?')) {
        removeTaskFromLocalStorage(task);
        li.remove();
    }
}

function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(({ text, completed, dueDate, priority }) => {
        addTask({ text, completed, dueDate, priority });
    });
}

function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function updateTaskInLocalStorage(oldTaskText, completed, dueDate, priority) {
    let tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(t => t.text === oldTaskText);
    if (taskIndex > -1) {
        tasks[taskIndex].completed = completed;
        tasks[taskIndex].dueDate = dueDate; // Update due date
        tasks[taskIndex].priority = priority; // Update priority
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t.text !== task.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.getElementById('search').addEventListener('input', filterTasks);
document.getElementById('filter').addEventListener('change', filterTasks);

function filterTasks() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filterValue = document.getElementById('filter').value;
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list

    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(searchValue);
        const matchesFilter = filterValue === 'all' || 
                              (filterValue === 'completed' && task.completed) || 
                              (filterValue === 'pending' && !task.completed);
        return matchesSearch && matchesFilter;
    });

    tasks.forEach(({ text, completed, dueDate, priority }) => {
        addTask({ text, completed, dueDate, priority });
    });
}
