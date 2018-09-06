const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
  
const recipeSchema = new Schema ({

title: {type: String, unique: true, required: true},
level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
ingredients: {type: Array},
cousine: {type: String, required: true},
dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
duration: {type: Number, min: 0},
creator: {type: String},
created: {type: Date, default: Date.now}

})

const Recipe = mongoose.model('Recipe', recipeSchema );

Recipe.create({

title: 'Fantastic Fiesta Potatoes',
level: 'Amateur Chef',
ingredients: ['Potatoes', 'Imagination', 'Super Skills', 'Garlic'],
cousine: 'Prima Cuisina',
dishType: 'Breakfast',
duration: 1000,
creator: 'Fernando',  
 })

.then((response)=>{
    console.log("Created a recipe", response)
})
.catch((err)=>{
    console.log("Failed horribly", err)
})

Recipe.insertMany(data)

.then((response) => {
    console.log(response)
 
})

.catch((err) => {
    console.log('oh shit', err);

})

Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
.then ((response) => {
    console.log(response)
})
.catch ((err) => {
    console.log(err)
})

Recipe.findOneAndRemove({title: "Carrot Cake"})
.then ((response) => {
    console.log(response)
})
.catch ((err) => {
    console.log(err)
})