$(document).ready(onReady);

function onReady() {
    console.log('jQuery is loaded!');

    // Click listener for add task button
    $('#addTask').on('click', addTask);

    // Click listener for check off task as complete
    $('#taskList').on('click', '#complete', checkComplete)

    // Click listener for deleting tasks
    $('#taskList').on('click', '#deleteBtn', deleteTask)
}

// POST
function addTask() {
    console.log('Inside addTask()');

    if ($('#task').val() === '') {
        alert('Please enter a task.');
        return;
    }

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

     // Keep cursor inside input
     $('#task').focus();

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
        if (task.completed){
        $('#taskList').append(`
            <tr data-id=${task.id}>
                <td><input type="checkbox" id="complete" checked></td>
                <td class='completed-task'>${task.task}</td>
                <td><button id="deleteBtn">X</button></td>
            </tr>
        `);
        } else {
            $('#taskList').append(`
            <tr data-id=${task.id}>
                <td><input type="checkbox" id="complete"></td>
                <td>${task.task}</td>
                <td><button id="deleteBtn">X</button></td>
            </tr>
        `);
        }
    }
} // end renderTasks

// PUT
function checkComplete() {
    console.log('Inside checkComplete()', $(this));
    const idToUpdate = $(this).parent().parent().data().id;
    console.log('Id to update:', idToUpdate);
  
    $.ajax({
      method: 'PUT',
      url: `/todo/checkcomplete/${idToUpdate}`
    }).then((response) => {
      // Call GET
      getTasks();
    }).catch((err) => {
      alert('error on checkComplete route', err);
    });
  } // end PUT

// DELETE
function deleteTask() {
    console.log("Inside of deleteTask: ", $(this));

    const idToDelete = $(this).parent().parent().data().id;
    console.log("Id to Delete: ", idToDelete);

    $.ajax({
        method: 'DELETE',
        url: `/todo/delete/${idToDelete}`
    }).then((response) => {
        console.log("Deletion completed for id:", idToDelete);
        getTasks();
    }).catch((error) => {
        console.log("Error making DB deletion for id:", idToDelete, error)
    });
} // end DELETE