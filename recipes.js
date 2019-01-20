const mongoose = require('mongoose');
const data = require('./data.js');
const Recipe = require('./models/recipes.model');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


Recipe.create({ 
  title: 'Paella',
  level: "UltraPro Chef",
  ingredients: ["rice","water","1/4 chicken","1/4 green beans", "colorant", "salt"],
  cuisine: "Spanish",
  dishType: "Dish",
  image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/01_Paella_Valenciana_original.jpg",
  duration: 40,
  creator: "Moi",
})
  .then(recipe => { console.log('The recipe is saved and is: ', recipe.title) })
  .catch(err => { console.log('An error happened:', err) });

Recipe.insertMany(data)
.then(recipe => { data.forEach((recipe) => { console.log('The recipes inserted is ', recipe.title)})})                
.catch(err => { console.log('An error happened:', err) });

Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
.then(() => { console.log('The recipe update')})
.catch(err => { console.log('An error happened:', err) });

Recipe.deleteOne({ title: "Carrot Cake"})
.then(()=> { console.log('The recipe remove') })
.catch(err => { console.log('An error happened:', err) });


process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}) 


