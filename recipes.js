const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')
const Recipe = require('./models/Recipe');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

function create(){
    Recipe.create({
        title: 'Asian Glazed Chicken Thighs',
            level: 'Amateur Chef',
            ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
            cousine: 'Asian',
            dishType: ['Dish'],
            image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
            duration: 40,
            creator: 'Chef LePapu'
    })
        .then((title) => {console.log(`${title} se creó`)
        })
        .catch(error =>{
            console.log(error)
        })
}
 //create();
function saveAllRecipes(){
    Recipe.insertMany(data)
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error)
        })
}
//saveAllRecipes();
function updateRecipe(title,duration) {
    Recipe.updateOne({title: title }, {duration: duration})
        .then(res => {
            console.log(`se actualizó ${res}`)
        })
        .catch(err=>{
            console.log(err)
        })
}
 //updateRecipe('Rigatoni alla Genovese',100);

function deleteOneRecipe(title){
    Recipe.deleteOne({title:title})
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
}

//deleteOneRecipe('Carrot Cake');

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});