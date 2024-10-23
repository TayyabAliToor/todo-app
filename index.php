<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>To-Do List</title>
</head>
<body>
    <h1>To-Do List</h1>
    <form id="add-task-form">
        <input type="text" id="task" placeholder="Add a new task..." required>
        <input type="date" id="due-date" required>
        <select id="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <button type="submit">Add Task</button>
    </form>
    <input type="text" id="search" placeholder="Search tasks...">
    <select id="filter">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
    </select>
    <ul id="task-list"></ul>
    <script src="js/todo.js"></script>
</body>
</html>
