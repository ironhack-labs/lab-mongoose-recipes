// --------------------------------------------------------------------------------
// Get environment settings 
// --------------------------------------------------------------------------------

require('dotenv').config();

// --------------------------------------------------------------------------------
// Get dependencies
// --------------------------------------------------------------------------------

const express      = require('express');
const mongoose     = require('mongoose');
const bodyParser   = require('body-parser');
const hbs          = require('hbs');
const hbsutils     = require('hbs-utils')(hbs);
const path         = require('path');
const cookieParser = require('cookie-parser');

// --------------------------------------------------------------------------------
// Connect to database
// --------------------------------------------------------------------------------

mongoose.connect('mongodb://localhost/kitchen', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// --------------------------------------------------------------------------------
  // Create the app
// --------------------------------------------------------------------------------

  const app = express();

// --------------------------------------------------------------------------------
// Define views and static folder
// --------------------------------------------------------------------------------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/partials');  // Register uncompiled partials with hbs for nodemon to track
app.use(express.static(path.join(__dirname, 'public')));

// --------------------------------------------------------------------------------
// Configure express session
// --------------------------------------------------------------------------------

const session = require('express-session');

app.use(session({
  secret: 'secret for recipes login',
  resave: false,
  saveUninitialized: true,
}));

// --------------------------------------------------------------------------------
// Add other middleware
// --------------------------------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// --------------------------------------------------------------------------------
// Set up routing
// --------------------------------------------------------------------------------

// Index --------------------------------------
const index = require('./routes/index');
app.use('/', index);

// User --------------------------------------
const signup = require('./routes/user/signup');
app.use('/', signup);

const login = require('./routes/user/login');
app.use('/', login);

const account = require('./routes/user/account');
app.use('/', account);

const logout = require('./routes/user/logout');
app.use('/', logout);

// Recipe --------------------------------------
const recipeList = require('./routes/recipe/list');
app.use('/', recipeList);

const recipeDetail = require('./routes/recipe/detail');
app.use('/', recipeDetail)

const recipeRemove = require('./routes/recipe/remove');
app.use('/', recipeRemove);

const recipeEdit = require('./routes/recipe/edit');
app.use('/', recipeEdit);

const recipeCreate = require('./routes/recipe/create');
app.use('/', recipeCreate);

// Cook --------------------------------------
const cookList = require('./routes/cook/list');
app.use('/', cookList)

const cookEdit = require('./routes/cook/edit');
app.use('/', cookEdit);

const cookCreate = require('./routes/cook/create');
app.use('/', cookCreate);

const cookRemove = require('./routes/cook/remove');
app.use('/', cookRemove);

// --------------------------------------------------------------------------------
// Export (needed in bin/www)
// --------------------------------------------------------------------------------

module.exports = app;
