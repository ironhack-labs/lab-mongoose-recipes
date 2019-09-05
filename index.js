const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    //newRecipe();
    //insertMany();
    //correctRecipe();
    //deleteOne();
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  function newRecipe() {
    Recipe.create({
      title: 'Daniel Pizza style',
      level: 'Amateur Chef',
      ingredients: ['tomato sause', 'floor', 'cheese', 'fungies'],
      cuisine: 'Italian',
      dishType: 'Dish',
      image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
      duration: 40, 
      creator: 'Chef Daniel V.',
    })
    .then (recipe => {// este nombre que colocamos aqui recipe hace referecnia al objeto de arriba, Recipe.create
      console.log(`is created ${recipe.title} recipe`);
    })
    .catch(error =>{
      console.log('Error creating the recipe', error);
    })
  }

  function insertMany() {
    Recipe.insertMany(data)
      .then (recipe =>{
          for (let item of recipe){
            console.log (`${item.title}`);
          }
      })
      .catch(error => {
        console.log('Error inserting the recipies');
      })
  } 

  function correctRecipe (){
    Recipe.findById('5d714d5ea3f095267817852f')
    .then (recipe => {
      console.log('Found recipe')
      recipe.duration = 100;
      recipe.save() // creates a promise
        .then (() => {
          console.log('Recipe was succesfully updated!');
        })
        .catch (error => {
          console.log('Recipe was not saved')
        })
    .catch (error => {
      console.log('Recipe was not succesfully updated')
      })
    });
  }

  function deleteOne() {
    Recipe.findByIdAndRemove('5d714d5ea3f095267817852e')
    .then (() => {
      console.log('Recipe deleted')
    })
    .catch (error => {
      console.log('Error deleating the recipe')
    }) 
  }

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });