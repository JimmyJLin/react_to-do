const express     = require('express');
const tasks       = express.Router();


var myTasks = {taskA:{
      name   : 'Jason',
      completed : true,    
      desc   : "blurgTest"
      }
  };

tasks.route('/')
  .get( (req,res)=>res.json(myTasks))
  .post( (req,res)=>{

  })
  .put( (req,res)=>{} )
  .delete((req,res)=>{})

module.exports = tasks;