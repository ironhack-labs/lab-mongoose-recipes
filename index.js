const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.set('view engine', 'hbs');
var bodyParser = require('body-parser');
const Recipe = require('./models/Recipe');
const Cook = require('./models/Cook');
const User = require('./models/User')
var session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// Connection to the database "kitchen"
mongoose.connect('mongodb://localhost/kitchen', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const home = require('./routes/home');
app.use('/', home);
const recipes = require('./routes/recipes');
app.use('/', recipes);
const cook = require('./routes/cook');
app.use('/', cook);
const user = require('./routes/user');
app.use('/', user);

module.exports = app;

app.listen(3000)
