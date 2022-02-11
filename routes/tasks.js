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

/* GET a form for posting a new task  */
router.get('/new',
  (req, res, next) => {
    let  data = {
        message: 'Post a new task',
        layout:  'layout.njk',
        title: 'Post a new task'
    }
    res.render('tasksform.njk', data);
});

/* POST a new task */
router.post('/',
  async (req, res, next) => {
    const sql = 'INSERT INTO tasks (task) VALUES (?)';
    const result = await pool.promise()
    .query(sql, [req.body.task])
    .catch(err => {
        console.log(err);
        res.status(500).json({
            tasks: {
                error: "Cannot retrieve tasks"
            }
        });
    });
    res.redirect('/tasks');
});

/* POST to delete a meep */
router.post('/delete/',
  async (req, res, next) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    const result = await pool.promise().query(sql, req.body.taskid);
    res.redirect('/tasks');
});

router.post('/edit/',
  async (req, res, next) => {
    const sql = 'UPDATE tasks SET completed = 1, updatedAt = now() WHERE id = ?';
    const result = await pool.promise().query(sql, req.body.taskid);
    res.redirect('/tasks');
});

router.get('/', async (req, res, next) => {
    /*let  data = {
        message: 'Displaying tasks',
        layout:  'layout.njk',
        title: 'Tasks',
        items: await pool.promise().query('SELECT * FROM tasks')
      }*/

    await pool.promise()
        .query('SELECT * FROM tasks')
        .then(([rows, fields]) => {
            let  data = {
                message: 'Displaying tasks',
                layout:  'layout.njk',
                title: 'Tasks',
                items: rows
            }
            res.render('ntasks.njk', data);
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