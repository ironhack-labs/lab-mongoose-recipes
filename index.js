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

 //Iteration II
Recipe 
    .create({title:'Flan', 
            level:'Easy Peasy',
            ingredients:['sugar','milk','eggs','vanilla'],
            cuisine:'Cuban',
            dishType:'Dessert',
            duration:30,
            creator:'Anabel Perez',})
    .then(recipe => console.log('T: ',recipe.title))
    .catch(err => console.log('Something went wrong. Try again!',err));
 //Iteration III
Recipe
    .insertMany(data)
    .then(recipes => {recipes.forEach(recipe => console.log('Recipe title: ', recipe.title))})
    .catch(err => console.log('Something went wrong. Try again!', err));
//Iteration IV
setTimeout(()=>{
  Recipe
        .updateOne({title: 'Rigatoni alla Genovese'},{$set: {duration: 100}})
        .then(console.log('Success updating information'))
        .catch(err => console.log('Could not update document: ', err));
},500)
//Iteration V
setTimeout(()=>{
  Recipe
        .deleteOne({title:'Carrot Cake'})
        .then(console.log('Success deleting document'))
        .catch(err => console.log('Could not delete document: ',err));
},500)
//Iteration VI    
setTimeout(()=>{
  mongoose.connection.close();
},1000)

