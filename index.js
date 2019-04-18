const mongoose = require('mongoose');
const express = require('express'); //
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const path = require('path')
const app = express()


app.set('view engine', 'hbs')

app.set('views', __dirname + '/views')

app.use(express.static(path.join(__dirname,'public')))


// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  app.get('/', (req,res) =>{
    const chilaquiles = {
      title: 'Chilaquilakillers',
      level: 'Easy Peasy',
      ingredients: ['Tortillas','Salsa','Crema','Pollo',],
      cuisine: 'Mexican',
      dishType: 'Breakfast',
      image: '',
      duration: 20,
      creator: 'Juan Nieves',
      
    }

    Recipe.create(chilaquiles)
      .then ((doc) => {
        
      res.render('index', doc)
      }) 
      .catch ((err) => {
        
        res.render('index', {err})
        }) 
  })


app.listen(3000, () =>{
  console.log('Estoy vivo')
})

