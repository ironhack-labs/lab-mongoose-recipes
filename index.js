const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

 Recipe.collection.drop();

  Recipe.create({ title: 'Avena', level:"Easy Peasy", ingredients: ['water','sugar'] ,
                  cuisine:'Cuban',dishType:'Snack',duration:9,creator:'josue'})
  .then(recipe => { console.log('The recipe is saved and its value is: ', recipe) })
  .catch(err => { console.log('An error happened:', err) });

  Recipe.insertMany(data)
  .then(console.log('inserted'))
  .catch(err => { console.log('An error happened:', err) });


  setTimeout(
    function(){ 

      Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, { duration: 100 })
      .then(console.log('updated rigaton'))
      .catch(err => { console.log('An error happened for rigaton:', err) });
    
      Recipe.deleteOne({ title: 'Carrot Cake'})
      .then(console.log('deleted carrot cake'))
      .catch(err => { console.log('An error happened for rigaton:', err) });

     },
     5000);

     setTimeout(
      function(){ 
        mongoose.connection.close();
       },
       10000);
  
//this works. but the best option is to move to sync with .then


  