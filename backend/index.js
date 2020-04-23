const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 5000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(bodyParser.json());


const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/movie-budgeting', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message);
    })
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

module.exports = db;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const scenesRouter = require('./routes/scene-info-router');
const usersRouter = require('./routes/users-router');

app.get('/', (req,res) =>{
	res.send('Express backend is running');
});

app.use('/api', scenesRouter)
app.use('/api', usersRouter)

app.listen(apiPort, () => console.log('Backend Server running on Port 5000'));