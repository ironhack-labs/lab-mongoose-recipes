const express         = require('express');
const mongoose        = require('mongoose');
const hbs             = require('hbs');
const Recipe          = require('./models/Recipe');
const Cook            = require('./models/Cook');
const recipeData      = require('./recipes');
const cookData        = require('./cooks');
const path            = require('path');
const app             = express();
const bodyParser      = require ("body-parser");
const cookieParser    = require('cookie-parser');
const favicon         = require('serve-favicon');
const logger          = require('morgan');
const session         = require('express-session');
const MongoStore      = require('connect-mongo')(session);

hbs.registerPartials(__dirname + '/views/partials');
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: 'mongodb://localhost/starter-code' })
}))

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

let createRecipe = (loopIndex) => {
  Cook.findOne({name: recipeData[loopIndex].cook}, (err, cookResult) => {
    if (err) console.log(err)
    else{
      recipeData[loopIndex].cook = cookResult._id;
      Recipe.create(recipeData[loopIndex])
    }
  })
}

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => { // Reset db and insert all recipes
    console.log('Connected to Mongo!');
    Recipe.collection.deleteMany({});
    Cook.collection.deleteMany({});
    return Cook.insertMany(cookData)
  })
  .then((cooks)=>{ // Insert all cooks
    console.log(`${cooks} successfully added`)
    for(i =0; i<recipeData.length; i++){
      createRecipe(i)
    }
  })
  .catch(err => {
    console.error(err);
  });

const homeRoute = require('./routes/home');
const cooksRoute = require('./routes/cooks');
const recipesRoute = require('./routes/recipes');
const usersRoute = require('./routes/users');
const mainRoute = require('./routes/main');
const privateRoute = require('./routes/private');

let protectRoute = function(req, res, next){
  if(req.session.user){
    next();
  } else{
    res.redirect('/users/login');
  }
}

app.use(function(req,res,next) {
  if(req.session.user) res.locals.user = req.session.user;
  next();
})

app.use('/', homeRoute);
app.use('/cooks/add', protectRoute);
app.use('/cooks', cooksRoute);
app.use('/recipes/add', protectRoute);
app.use('/recipes', recipesRoute);
app.use('/users', usersRoute);
app.use('/main', protectRoute, mainRoute);
app.use('/private', protectRoute, privateRoute);

app.listen(3000, () => console.log("Connected"))

module.exports = app;