const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
Recipe.collection.drop()

Recipe.create({ 
  title:  'Roscón de Reyes', 
  level: 'Amateur Chef',
  ingredients: ['harina','leche','azucar','almendras','mantequilla','canela'],
  cuisine:'española',
  dishType: 'Other',
  duration: 300,
  creator: 'Baltasar'
})
.then(x=>Recipe.insertMany(data))
.then(all => all.forEach(elm=>console.log(elm.title)))
.then(x => Recipe.updateOne({title:"Rigatoni alla Genovese"}, {duration: 100}))
.then (x => {console.log("yujuuuuu")})
.then(x => Recipe.deleteOne({title:'Carrot Cake'}))
.then (x => {console.log("success Elemento borrado")})
.catch (err => { console.log(err)})

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

