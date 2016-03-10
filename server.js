'use strict'
const express     = require('express');
const logger      = require('morgan');
const path        = require('path');
const bodyParser  = require('body-parser');

const app       = express();
const PORT     = process.argv[2] || process.env.port || 3009;

const taskRoutes     = require('./routes/tasks');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// serve static files
app.use(express.static(path.join(__dirname,'public')))

// set up some logging
app.use(logger('dev'));
app.use('/tasks',taskRoutes);


// turn me on!
app.listen(PORT , ()=>
  console.log(`server here! listening on`, PORT ) 
)