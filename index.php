<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>My To-Do List</h1>
    <form method="POST">
        <input type="text" name="task" placeholder="Add a new task" required>
        <button type="submit">Add</button>
    </form>
    <ul>
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['task'])) {
            echo '<li>' . htmlspecialchars($_POST['task']) . '</li>';
        }
        ?>
    </ul>
    <script src="todo.js"></script>
</body>
</html>
