const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const hbs = require('hbs')
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const app = express()


app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(express.static(path.join(__dirname, 'public')))
hbs.registerPartials(__dirname + '/views/partials')
// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
  
app.get('/', (req, res) => {
  const chilaquiles = {
    title: 'Chilakillerss',
    level: 'Easy Peasy',
    ingredients: ['Tortillas', 'Salsa', 'Crema', 'Pollo', 'Queso'],
    cuisine: 'Mexican',
    dishType: 'Breakfast',
    image: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi1s8WwqdjhAhUQHqwKHR8EA2IQjRx6BAgBEAU&url=https%3A%2F%2Fwww.marthastewart.com%2F1512850%2Fchilaquiles-egg-bake&psig=AOvVaw0nj6E9MMrZ8g6LeD9kwJcS&ust=1555631581006188',
    duration: 20,
    creator: 'Juan Nieves', 
  }
  console.log(chilaquiles)

  Recipe.create(chilaquiles)
  .then ((doc) => {
    console.log(doc)
    res.render('index', doc)
  })
  .catch ((err) => {
    console.log(err)
    res.render('index', {err})
  })
})

app.get('/all', (req, res) =>{
  mongoose.connection('open')
  Recipe.find()
  .then ((recipes) =>{
    res.render('recipeAll', {recipes})
  })
  .catch ((err) => {
    console.log("La cagaste burtlancaster")
    res.render('recipeAll', {err})
  })
  mongoose.connection.close()
})

app.get('/create', (req, res) => {
  mongoose.connection('open')
  Recipe.create(data)
    .then((dataArr)=>{
      console.log("Por el momento", dataArr)
    })
    .catch(err => {
      console.log('Mal mal mal')
      res.render('create', {err})
    })
  mongoose.connection.close()
})

app.get('/update', (req, res)=>{
  mongoose.connection('open')
  Recipe.findOneAndUpdate({
    title: 'Rigatoni alla Genovese'
  },{ duration: 100
  },{new: true})
  mongoose.connection.close()
})

app.get('/remove', (req,res)=>{
  mongoose.connection('open')
  Recipe.findOneAndDelete({
    title: 'Carrot Cake'
  })
  mongoose.connection.close()
})

app.listen(3000, () => {
  console.log('Estoy vivo, solo por hoy')
} ) 
