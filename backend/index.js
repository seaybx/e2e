const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')

const scenesRouter = require('./routes/scenes-router');
const usersRouter = require('./routes/users-router');
const projectsRouter = require('./routes/projects-router');
require('./middleware/passport-config');

const apiPort = 5000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(bodyParser.json());


app.use('/api', scenesRouter)
app.use('/api', usersRouter)
app.use('/api', projectsRouter)


// Mongoose - MongoDB Connection
mongoose
    .connect('mongodb://127.0.0.1:27017/movie-budgeting', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message);
    })
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
module.exports = db;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req,res) =>{
	res.send('Express backend is running');
});


app.listen(apiPort, () => console.log('Backend Server running on Port 5000'));