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

// HOME PAGE 
app.get('/', function (req, res) {
res.render('homepage')
})
  
// SHOW ALL RECIPES 
app.get('/recipes', (req, res) => {
  Recipe.find({})
  .populate("cook")
  .then((recipes) => {
    res.render('recipes', {recipes})
  })
  .catch(err => {
    console.log(err)
  })
})
  
// ADD A NEW RECIPE 
app.get('/add-recipe', (req, res) => {
  Cook.find({})
  .then((cooks) => {
    res.render("add-recipe", {cooks});
  })
  .catch((err)=> {
    console.log(err);
  })
})
  
app.post('/recipe/add', (req, res) => {
  let { title, level, ingredients, cuisine, dishType, image, duration, creator, created, cook } = req.body;
  const newRecipe = new Recipe({title, level, ingredients, cuisine, dishType, image, duration, creator, created, cook : mongoose.Types.ObjectId(cook) })
  newRecipe.save()
  .then((recipe) => {
    res.redirect('/recipes');
  })
  .catch((error) => {
    console.log(error);
  })
});
  
// EDIT A RECIPE 
app.get('/edit-recipe/:id', (req, res) => {
  Recipe.findOne({_id : req.params.id})
  .populate("cook")
  .then((recipe) => {
    Cook.find({})
    .then((cooks) => {
      res.render("edit-recipe", {recipe, cooks});
    })
  })
  .catch((error) => {
     console.log(error)
  })
});

app.post('/recipe/edit/:id', (req, res) => {
  let { title, level, ingredients, cuisine, dishType, image, duration, creator, created, cook } = req.body;
  Recipe.updateOne({_id : req.params.id}, {$set: {title, level, ingredients, cuisine, dishType, image, duration, creator, created, cook : mongoose.Types.ObjectId(req.body.cook)}})
    .then(recipe => {
    res.redirect('/recipes'); 
  })
  .catch(err => {
     console.log(err)
  })
})
  
// DELETE A RECIPE 
app.get('/recipe/delete/:id', (req, res) => {
  Recipe.deleteOne({_id : req.params.id})
  .then(recipe => {
  res.redirect('/recipes');
  })
    .catch((error) => {
     console.log(error)
    })
})
   
// SHOW ALL COOKS 
app.get('/cooks', (req, res) => {
  Cook.find({})
  .then((cooks) => {
    res.render('cooks', {cooks})
  })
  .catch(err => {
    console.log(err)
  })
})

// ADD A NEW COOK 
app.get('/add-cook', (req, res) => {
  res.render('add-cook');
})

app.post('/cook/add', (req, res) => {
  const { name } = req.body;
  const newCook = new Cook({name})
  newCook.save()
  .then((cook) => {
    res.redirect('/cooks');
  })
  .catch((error) => {
    console.log(error);
  })
});

// DELETE A COOK 
app.get('/cook/delete/:id', (req, res) => {
  Cook.deleteOne({_id : req.params.id})
  .then(recipe => {
    res.redirect('/cooks');
  })
    .catch((error) => {
      console.log(error)
    })
  })

// USER SIGN UP 
app.get('/signup', function(req, res, next) {
  res.render('signup');
});

app.post('/users/signup', function(req, res, next) {
  let newUser = {
    username: req.body.username, 
    password: req.body.password
  }
  User.create(newUser)
    .then((user)=> {
      res.redirect('/login');
    })
    .catch(()=> {
      res.send("error");
    })
});

// USER LOGIN
app.get('/login', function(req, res, next) {
  res.render('login');
})

app.post('/login', function(req, res, next) {
  User.findOne({username : req.body.username})
  .then((user) => {
    if (user){
     if(user.password === req.body.password){
        req.session.user = user;
        res.redirect('/user/profile');
      } else {
          res.send('Invalid credentials');
      }
    } else {
      res.send('Invalid credentials');
    }
  })
  .catch((err) => {
    res.send(err);
  })
})

// USER PROFILE
app.get('/user/profile', function (req, res){
  res.render("user-profile")
})

// USER LOGOUT
app.get('/user/logout', function (req, res){
  req.session.destroy;
  res.redirect('/')
})

app.listen(3000)
