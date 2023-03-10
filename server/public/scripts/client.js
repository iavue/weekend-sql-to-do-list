$(document).ready(onReady);

function onReady() {
    console.log('jQuery is loaded!');

    // Click listener for add task button
    $('#addTask').on('click', addTask);
}

// POST
function addTask() {
    console.log('Inside addTask()');

    let objectToSend = {
        task: $('#task').val()
    };

    $.ajax({
        method: 'POST',
        url: '/todo',
        data: objectToSend
    }).then((response) => {
        console.log('Post finished.');
        // To do: Call GET to refresh DOM
        getTasks();
    }).catch((response) => {
        alert('Request failed. Unable to send object.')
    });

     // Clear input values
     $('#task').val('');
     
} // end addTask

// GET
function getTasks() {
    console.log('Inside getTasks()');

    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then((response) => {
        console.log('Tasks:', response);
        // Render to dom
        renderTasks(response);
    }).catch((error) => {
        console.log('error in GET', error);
    });
} // end getTasks

// Render Tasks to DOM
function renderTasks(incomingTasks) {
    console.log('Inside renderTasks()');

    // Empty the table
    $('#taskList').empty();

    for (let task of incomingTasks) {
        // loop through incomingTasks and append
        $('#taskList').append(`
            <tr data-id=${task.id}>
                <td>${task.task}</td>
                <td>Checkbox Goes Here</td>
                <td><button id="deleteBtn">X</button></td>
        `);
    }
} // end renderTasks