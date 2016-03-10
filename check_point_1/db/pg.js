var pgp = require('pg-promise')({});

var cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

var db = pgp(cn)

// add new task
function addTask (req, res, next){
  db.one("INSERT INTO tasks (task_name, task_desc) VALUE ($1, $2) RETURNING task_id;", [req.body.name, req.body.description])
    .then((data)=>{
      res.rows = data;
      console.log(res.rows)
      next();
    })
    .catch((error)=>{
      console.log(error)
    })
}

// list all tasks
function getTasks (req, res, next){
  db.one("SELECT * FROM tasks;")
    .then((data)=>{
      console.log("GET TASK")
      res.rows = data;
      next();
    })
    .catch((error)=>{
      console.log(error);
    })
}

// update task
function toggleTask(req, res, next){
  db.none("UPDATE tasks SET completed = NOT completed WHERE task_id = ($1);", [req.params.taskid])
  .then((data)=>{
    console.log("UPDATED TASK")
    res.rows = data;
    next();
  })
  .catch((error)=>{
    console.log(error);
  })
}

// update Time
function updateTime(req, res, next){
  db.none("UPDATE tasks SET task_time_start = ($1), task_time_end = ($2) WHERE task_id = ($3);", [req.body.start_time, req.body.end_time, req.params.taskid])
  .then((data)=>{
    console.log("UPDATED TIME")
    res.rows = data;
    next();
  })
  .catch((error)=>{
    console.log(error);
  })
}

// delete task
function deleteTask(req, res, next){
  db.none('DELETE FROM tasks WEHRE task_id = ($1);', [req.params.taskid])
  .then((data)=>{
    console.log("DELETED TASK")
    res.rows = data;
    next();
  })
  .catch((error)=>{
    console.log(error);
  })
}


module.exports.db = db;
module.exports.pgp = pgp;
module.exports.addTask = addTask;
module.exports.getTasks = getTasks;
module.exports.toggleTask = toggleTask;
module.exports.updateTime = updateTime;
module.exports.deleteTask = deleteTask;
