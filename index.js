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
let recipe1 = {
  title: 'Papas',
  level: 'Easy Peasy',
  ingredients: ['papas','water'],
  cuisine: 'Canaria',
  dishType: 'Dish',
  duration: 60,
  creator:'Johann',
}

Recipe.create(recipe1)
.then(()=>{
  console.log(recipe1.title);
  Recipe.insertMany(data)
  .then(result => {
    result.forEach((recipe) =>{
      console.log(recipe.title);
    });
    Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{$set:{"duration":100}})
      .then(() => {
        console.log('Recipe update succesful');
        Recipe.deleteOne({title:'Carrot Cake'})
        .then(() => {
          console.log('Recipe deleted')
          mongoose.connection.close()
            .then(() => console.log('Connection Succesful'));
        })
        .catch((err) => console.error(err));        
      })
      .catch((err) => console.error(err));
  })
  .catch(err => console.error(err)); 
  })
.catch((err) =>console.error(err));