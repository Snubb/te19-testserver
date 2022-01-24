const express = require('express');
const pool = require('../database');
const router = express.Router();

/*

    BASE URL /tasks
    GET / - Get all tasks
    POST / - Create a new task
    GET /:id - Get task by id
    PUT /:id - Update task by id
    DELETE /:id - Delete task by id

*/
router.get('/', async (req, res, next) => {
    await pool.promise()
        .query('SELECT * FROM tasks')
        .then(([rows, fields]) => {
            res.json({
                tasks: {
                    data: rows
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                tasks: {
                    error: "Cannot retrieve tasks"
                }
            });
        });
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    if(isNaN(id)) {
        res.status(400).json({
            task: {
                error: "Input a number you fool"
            }
        });
    } else {
        await pool.promise()
        .query('SELECT * FROM tasks WHERE id = ' + id)
        .then(([rows, fields]) => {
            if(rows.length != 0) {
                res.json({
                    tasks: {
                        data: rows
                    }
                });
            } else {
                res.json({
                    tasks: {
                        error: "ID does not exist"
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                tasks: {
                    error: "Cannot retrieve tasks"
                }
            });
        });
    }
});


module.exports = router;