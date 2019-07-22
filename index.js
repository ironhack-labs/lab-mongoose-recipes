const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.set('view engine', 'hbs');
var bodyParser = require('body-parser');
const Recipe = require('./models/Recipe');
const Cook = require('./models/Cook');

app.use(bodyParser.urlencoded({ extended: false }))

// Connection to the database "recipeApp"
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


app.listen(3000)