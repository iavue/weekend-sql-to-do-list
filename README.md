# Project Name

 SQL To-Do List

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Your project description goes here. What problem did you solve? How did you solve it?

This To Do application allow users to create tasks and add it to the list of tasks, with the ability to check off a task as completed and delete a task.

Once the user adds a task, the POST route sends the task to the server, and then using SQL and PG, the task is sent to the database. With a successful POST, the task is stored in the database and the GET route will refresh the web page with the task, a checkbox and an option to delete. 

If the checkbox is clicked, this information is sent through the server in a PUT route, and then using SQL and PG, we connect to the the database and it stores the value of 'true' in the 'completed' column for the task that was checked off. In the front end, the container for the task will update to a green color as a visual representation to indicate that the task is completed. 

If a task is deleted, this information is sent through the server in a DELETE route, and then using SQL and PG, we connect to the the database and the task is removed from the database. With a successful DELETE, the client will refresh the web page with the current tasks from the database.

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
