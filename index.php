<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>To-Do List App</title>
</head>
<body>
    <div class="container">
        <h1>To-Do List</h1>
        <form id="add-task-form">
            <input type="text" id="task" placeholder="Add a new task" required>
            <button type="submit">Add Task</button>
        </form>
        <ul id="task-list">
            <!-- Tasks will be added here -->
        </ul>
    </div>
    <script src="js/todo.js"></script>
</body>
</html>
