'use strict'
var pg = require('pg-promise')({
    // Initialization Options 
});
var config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  };

var db = pg(config);



function getTasks(req, res, next) {
  db.any("SELECT * from tasks;")
    .then(function (data) {
      res.rows = data;
      next();
    })
    .catch(function (error) {
        // error; 
      console.log('Error', error);
    });
}

function addTask(req, res, next) {
  db.one(`
    INSERT INTO 
    tasks (task_name, task_desc) 
    VALUES ($1, $2)
    returning task_id;`,
        [ req.body.name , req.body.description ]
    )
    .then((data)=>{
      console.log('ADDED TASK SUCCESSFUL');
      res.rows = data;
      next();
    })
    .catch((error)=>{
      console.log('ERROR in ADDING TASK!', error);
    })
}

function toggleTask(req, res, next) {
  db.none(`
    UPDATE tasks 
    SET completed = NOT completed 
    WHERE task_id = ($1);`,
          [ req.params.taskid ]
    )
    .then(()=>{
      console.log('UPDATED TASK SUCCESSFUL!');     // testing status for UPDATE
      next();
    })
    .catch((error)=>{
      console.log('ERROR in EDITING TASK DETAILS!', error);
    })
}

function updateTime(req, res, next) {
  db.none(`
      UPDATE tasks 
      SET 
        task_time_start = ($1),
        task_time_end = ($2) 
      WHERE task_id = ($3);`,
        [ req.body.start_time, req.body.end_time , req.params.taskid ] )
  .then(()=>{
    console.log('UPDATED TASK TIME SUCCESSFUL!');     // testing status for UPDATE
    next();
  })
  .catch((error)=>{
    console.log('ERROR in EDITING TIME!', error);
  })
}

function deleteTask(req, res, next) {
  db.none(`
    DELETE FROM 
    tasks WHERE task_id = ($1);`,
          [ req.params.taskid ])
    .then(()=>{
      console.log('DELETE COMPLETED!');     // testing status for DELETE
      next();
    })
    .catch((error)=>{
      console.log('ERROR in DELETING TASK!', error);
    })
}




module.exports.getTasks   = getTasks;
module.exports.addTask    = addTask;
module.exports.toggleTask = toggleTask;
module.exports.deleteTask = deleteTask;
module.exports.updateTime = updateTime;