const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    return Recipe.collection.drop()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  })

  .then(() => {
    return Recipe.create({
      title: 'Lentejas',
      level: 'Amateur Chef',
      ingredients: ['lentejas', 'chorizo', 'cebolla', 'ajo'],
      cuisine: 'Spanish',
      dishType: 'Dish',
      duration: 50,
      creator: 'Daniel Vieitez'
    })
  }).then(recipe=>console.log(recipe.title))
  .then(() => { return Recipe.insertMany(data)
  }).then(recipes=>recipes.forEach(recipes => console.log(recipes.title)))
  .then(() => {return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration: 100}).then(recipeUpdated => console.log("Success!"))
  }).then(() => {return Recipe.deleteOne({title:"Carrot Cake"}).then(recipeRemoved => console.log("Success!"))})
  .then(() =>  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination')}))  
  
  .catch(err=>console.log(err))
 

