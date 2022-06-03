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
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  
  
  const YorkshirePuddingRecipe = {
    title: 'Yorkshire puddings',
    level: 'amateur chef',
    ingredients: ['175g plain flour','1 tsp salt',' 3 eggs, beaten','300ml cold full-fat milk'],
    cuisine: 'English',
    dishtype: 'maincourse',
    images: 'https://99easyrecipes.com/english-yorkshire-pudding/',
    duration: 1,
    creator: 'jamieoliver',
 };
  
 Recipe.create(YorkshirePuddingRecipe)
 
 .then(YorkshirePuddingRecipe => console.log(`recipe added: ${YorkshirePuddingRecipe.title}`))
 
 .catch(err => console.log(err));
  
  
  
 Recipe.insertMany(data)
 .then(recipe => {
   recipe.forEach(item => {
     console.log(`recipe for ${item.title} inserted successfully`);
   });
 })
 .catch(err => console.log(err));
  
  
  
  
 Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
 .then(() => console.log(`The recipe is updated`))
 .catch(err => console.log(err));
  
  
  
 Recipe.deleteOne({ title: 'Carrot Cake' })
 .then(() => console.log(`The recipe is deleted`))
 .catch(err => console.log(err));

})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
 
  mongoose.connect
  .close()
 console.log(`Connection closed')
}
};