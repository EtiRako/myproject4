//import package
const express = require('express');
//execute
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const shell = require('shelljs');

require('dotenv/config');

app.use(cors());

app.use(bodyParser.json());

/* //Middlewares fonction qui exec qd routes sont hit
app.use('/posts', ()=>{
    console.log('This is a middleware running');
}); */

//Import routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

//CREATE ROUTES
app.get('/', (req,res)=>{
    res.send('We are on home');
})


//Connect DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    ()=> console.log('connected to DB !')
);

//Schedule tasks
cron.schedule('* * * * * *', function() {
    console.log('running a task every minute');
  });

/*
* * * * * *
| | | | | |
| | | | | day of week
| | | | month
| | | day of month
| | hour
| minute
second ( optional )
*/  

//LISTENING TO THE SERVER
app.listen(3000);
