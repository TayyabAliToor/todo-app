document.getElementById('add-task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskInput = document.getElementById('task');
    const taskValue = taskInput.value;
    
    if (taskValue) {
        addTask(taskValue);
        taskInput.value = ''; // Clear input field
    }
});

function addTask(task) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.textContent = task;
    taskList.appendChild(li);
}
