//jshint esversion:8
const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  
  //ITERATION 2

  .then(() => {
    Recipe.create({
      title: 'Fejoun alla Tina',
      level: 'Easy Peasy',
      ingredients: ['beans', 'peppar', 'salt'],
      cuisine: 'French',
      dishType: 'main_course',
      duration: 45,
      creator: 'Tina Finb',
    })
    .then(receita => console.log(`Receipt name: "${receita.title}" created successfully.`))
    .catch(err => console.log('Ops! Something went wrong creating the recipe - ',err));
  }) 

  // ITERATION 3 
  
  .then(() => { 
    Recipe.insertMany(data)
    .then(()=>{
      Recipe.find()
      .then((recipes) => {
        recipes.forEach(element => console.log(element.title));
      })

      // ITERATION 4

      .then(()=> {
        //the third parameter "new" set to true returns the doc after update is applied, otherwise it returns the doc before update was applied  
        Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration : 100}, {new: true})
        .then((doc)=>  console.log(`Recipe "${doc.title}" duration field successfully updated`, doc))
        .catch(err => console.log('Ops! Something went wrong updating the document - ',err));
      })

      // ITERATION 5

      .then(()=> {
        //deletes user where the title contains "carrot cake" insensitive case
        Recipe.deleteOne({title: /carrot cake/i})
        .then((doc) => console.log(`${doc.deletedCount} successfully deleted document.`))

        // ITERATION 6

        .then(() => {
          console.log('Disconnecting database...');
          mongoose.connection.close();
          console.log('Disconnected.');
        })
        .catch(err => console.log('Ops! Something went wrong deleting the document - ',err));
      })
      .catch(err => console.log('Ops! Something went wrong - ',err));
    })

    
    .catch(err => console.log('Ops! Something went wrong inserting the documents - ',err));
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

