const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')
const Recipe = require("./models/Recipe");

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')

  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


/* 
Recipe.create({
  title: "Torrijas",
  level: 'Easy Peasy',
  ingredients: ["Pan", "Leche", "Azucar", "Canela", "Aceite", "Harina", "Limon"],
  cousine: "Española",
  dishType: 'Dessert',
  image: "http://elpetitchef.com/Images/134/presentacion.jpg",
  duration: 90,
  creator: "Raul",
})
  .then((recipe) => {
    console.log('The recipe is saved and its title is: ', recipe.title)
    Recipe.insertMany(data, (error, docs) => {
      console.log(error)
      console.log(data)
    });
  })
  .catch((err) => { console.log('An error happened:', err) }); */

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, {$set:{ duration: 'hola' }})
.then(obj=>console.log(obj))
.catch(err=>console.log(err))













