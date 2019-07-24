const mongoose = require('mongoose');
const express = require('express');
const app = express();
var path = require('path');
const hbs = require("hbs");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
var bodyParser = require('body-parser');
var session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use

// Connection to the database "kitchen"
mongoose.connect('mongodb://localhost/kitchen', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// defining custom route protection middleware
let protectRoute = function(req, res, next) {
  if(req.session.user) next();
  else {res.redirect("/login")}
}

// attaching session data to res.locals, 
// making it available to all hbs files after this middleware
app.use(function(req,res,next) {
  if(req.session.user) res.locals.user = req.session.user;
  next();
})

const home = require('./routes/home');
app.use('/', home);
const user = require('./routes/user');
app.use('/', user);
const recipes = require('./routes/recipes');
app.use('/', protectRoute, recipes);
const cook = require('./routes/cook');
app.use('/', protectRoute, cook);

module.exports = app;

app.listen(3000)
