const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    //ITERATION 2 - adding 1 new recipe to database
    const newRecipe = { 
      title: 'Lemon and Garlic Salmon', 
      level: 'Easy Peasy', 
      ingredients: ['salmon', 'olive oil', 'garlic', 'Italian herb mix', 'lemon', 'salt and pepper'],
      cuisine: 'Mediterrenean',
      dishType: 'main_course',
      duration: 25,
      creator: 'Zsoka', 
     };
		 
		Recipe.create(newRecipe)
		  .then(newRecipe => console.log(`The ${newRecipe.title} is saved`))
		  .catch(error => console.log('An error happened while saving the dish:', error));
		
    //ITERATION 3 - inserting multiple recipes
    Recipe.insertMany(data)
      .then(console.log("Recipes inserted succesfully"))
		  .catch(error => console.log('An error happened while saving the dishes:', error));
    
    //ITERATION 4 - update recipe
    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration:100}, {new: true})
     .then(updatedRecipe => console.log(`${updatedRecipe.title}'s duration was updated`))
     .catch(error => console.log('An error happened while updating the recipe:', error));
    
    //ITERATION 5 - remove a recipe
    Recipe.deleteOne({ title: 'Carrot Cake' })
      .then(console.log("Recipe deleted"))
      .catch(error => console.log('An error happened while deleting a recipe:', error));
  })
  .then(mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  