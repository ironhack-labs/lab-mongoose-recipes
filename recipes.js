const express = require('express')
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')
const app = express()


const Recipe = new Schema({
  title: {type: String, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: Array,
  cousine: String,
  dishType: {type: String, enum:[ 'Breakfast' , 'Dish' , 'Snack' , 'Drink' , 'Dessert' , 'Other']},
  img: {type: String, default: ' https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min:0},
  creator: String,
  created: {type: Date, default: Date.now}
})

const recipe = mongoose.model('recipe', Recipe);

let insert = () => {
return recipe.insertMany(data)
.then(recipes => {console.log(recipes)})
.catch(err => {console.log(err)})
}

let update =() => {
  return recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
    .then(() => {console.log('SUCCESFULLY CHANGED DURATION FOR RIGATONI!!!!!')})
    .catch(() => console.log('errorrrr'))
};

let deleteOne = () => {
  return recipe.deleteOne({ title: 'Carrot Cake' })
  .then(() => {console.log(' RECETA DE ZANAORIAS BORRADA DE LA BASE DE DATOS ')})
  .catch(() => {console.log('NO SE PUEDE BORRAR LA RECETA DE ZANAORIAS')
  })
}

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {console.log('Connected to Mongo!'); recipe.collection.drop(); return insert()})
  .then(() => {return update()})
  .then(() => {return deleteOne()})
  .then(() => {
    mongoose.disconnect().then(() => { console.log('Entra')})})
  .catch((e) => { console.log(e)})

  


