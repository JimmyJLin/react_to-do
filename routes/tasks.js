const express     = require('express');
const tasks       = express.Router();


const db = require('../db/pg');

// /tasks
tasks.route('/')
  .get( db.getTasks, (req,res)=>res.json(res.rows))
  .post( db.addTask, (req,res)=>res.json(res.rows))

// /tasks/task-12345/time
tasks.route('/:taskID/time')
  .put( db.updateTime, (req,res)=>{
    // update a task's time, if it exists
    // if not, do nothing.

    //todo: return the actual id from the db, instead of just echoing here
    res.send(req.params.taskid)
  })

// /tasks/task-12345
tasks.route('/:taskID')
  .put( db.toggleTask, (req,res)=>{
    // update a specific task
    //todo: return the actual id from the db, instead of just echoing here
    res.send(req.params.taskid)
  })
  .delete(db.deleteTask, (req,res)=>{
    // delete a specific task
    //todo: return the actual id from the db, instead of just echoing here
    res.send(req.params.taskid)
  })

module.exports = tasks;