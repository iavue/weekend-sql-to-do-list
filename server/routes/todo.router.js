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





// DELETE






module.exports = router;