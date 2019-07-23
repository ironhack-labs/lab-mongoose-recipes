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
app.use('/', require('./routes/index'));

// User --------------------------------------
app.use('/', require('./routes/user/signup'));
app.use('/', require('./routes/user/login'));
app.use('/', require('./routes/user/account'));
app.use('/', require('./routes/user/logout'));

// Recipe --------------------------------------
app.use('/', require('./routes/recipe/list'));
app.use('/', require('./routes/recipe/detail'));
app.use('/', require('./routes/recipe/remove'));
app.use('/', require('./routes/recipe/edit'));
app.use('/', require('./routes/recipe/create'));

// Cook --------------------------------------
app.use('/', require('./routes/cook/list'));
app.use('/', require('./routes/cook/edit'));
app.use('/', require('./routes/cook/create'));
app.use('/', require('./routes/cook/remove'));

// --------------------------------------------------------------------------------
// Add error page
// --------------------------------------------------------------------------------

// Not doing this for now
// app.use(function(req, res){
//   res.send("ERROR ERROR " + res.locals.error)
// });

// --------------------------------------------------------------------------------
// Export (needed in bin/www)
// --------------------------------------------------------------------------------

module.exports = app;
