const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const postRouter = require('./route/post-routes');
const userRouter = require('./route/users-routes');
const app = express();

// set mongoose mongodb connection  mongodb://localhost:27017/cromophotos2
// mongodb://localhost:27017/testOne
// mongodb+srv://amosmoyo:' + process.env.password + '@cluster0-spg3d.mongodb.net/cromophoto
// mongodb+srv://amosmoyo:qiGlmy7Q@cluster0-spg3d.mongodb.net/testOne?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://amosmoyo:' + process.env.password + '@cluster0-spg3d.mongodb.net/cromophoto', {useNewUrlParser:true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Connection error'));
connection.once('open', () => {
  console.log('Connection to database was successful');
});

// set middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/images', express.static(path.join('backend/images')))


app.use('/api/posts', postRouter);
app.use('/api/posts', userRouter);

module.exports = app;
