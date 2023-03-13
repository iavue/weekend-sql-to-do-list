// Setup PG to connect to the database
const express = require('express');
const router = express.Router();
const pg = require('pg'); 

// DB Connection
const pool = new pg.Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432
});

// GET
router.get('/', (req, res) => {
    console.log('Inside of GET');
    let queryText = 'SELECT * FROM "todo";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
})

// POST
router.post('/', (req, res) => {
    console.log('Inside of POST');
    let newTask = req.body;
    console.log('Req.body should be object sending to DB:', req.body);

    const queryText = `INSERT INTO "todo" ("task")
    VALUES ($1);`;

    pool.query(queryText, [newTask.task])
            .then((results) => {
                res.sendStatus(200);
                console.log('POST WORKED');
            }).catch((error) => {
                console.log('error adding new task', error);
                alert('POST DID NOT WORK');
                res.sendStatus(500);
            });
});

// PUT
router.put('/checkcomplete/:id', (req, res) => {
    const taskId = req.params.id;
    console.log('Task to check off as complete:', req.params.id);

    const query = `
        UPDATE "todo" SET "completed" = NOT "completed" WHERE "id"=$1;
    `;

    pool.query(query, [taskId])
    .then((result) => {
        console.log("Update successful for task id:", taskId);
        res.sendStatus(200);  
    }).catch((err) => {
        console.log('Error making update to task id:', taskId, err);
        console.log('Update query:', query);
        res.sendStatus(500);
    });
});

// DELETE
router.delete('/delete/:id', (req,res) => {
    console.log("Inside of /:id, DELETE request: ");
    const idToDelete = req.params.id;
    const query = 'DELETE FROM "todo" WHERE "id"=$1;';

        pool.query(query, [idToDelete])
        .then((result) => {
            console.log("Successful deletion of id:", idToDelete);
            res.sendStatus(200)
        }).catch((error) => {
            console.log(`Error in making query:, ${query}`, error)
            res.sendStatus(500)
        });
});

module.exports = router;