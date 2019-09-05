const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    //createRecipe();
    //importArray();
    //changeduration();
    remove();

  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



  function createRecipe() {
    const recipe= new Recipe;
    Recipe.create({
      title: 'Pancakes',
      cuisine: 'American'
    })

        .then(recipe =>{
            console.log('create new recipe!')
            console.log(recipe);

        })

        .catch(error =>{
            console.log('Got an error creating book');
                

        })}


function importArray() {
    Recipe.insertMany(data)
    data.map(item=> {
      console.log(item.title)
    })
  }


  function changeduration() {
  
    Recipe.findById('5d714c3bd07d401a40dffadb')
        .then(recipe =>{
            console.log('Found recipe!')
            console.log(recipe);

            recipe.duration = 200;
            recipe.save()
                .then(() =>{
                    console.log('recipe was successfully saved.');
        })
                .catch(error =>{
                    console.log('Got an error saving recipe');
                

        })
        .catch(error =>{
            console.log('Got an error loading recipe');
        });

    })}


    function remove() {
  
      Recipe.findByIdAndRemove('5d714c3bd07d401a40dffada')
          .then(recipe =>{
              console.log('recipe removed!')
              console.log(recipe);
            })
    
          .catch(error =>{
              console.log('Got an error loading recipe');
          });
  
        }