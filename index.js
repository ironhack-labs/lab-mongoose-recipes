const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const myRecipe = { title: "Guacamole", level: "Easy Peasy", ingredients: ["2 avocados", "1 lime", "1 tomato", "1/2 onion", "salt", "pepper"], cuisine: "Mexican", dishType: "snack", image: "https://assets.afcdn.com/recipe/20181123/84182_w1024h768c1cx2592cy1728.jpg", duration: 10, creator: "Jordan" };

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
    // return Recipe.deleteMany()
  })
  .then(() => {
    // Recipe.create(myRecipe)
    // .then(recipe => console.log('The recipe is saved and its title is: ', recipe.title))
    // .catch(error => console.log('An error happened while saving a new recipe:', error));

    // Recipe.insertMany(data)
    //   .then(data.forEach(recipe => console.log('The recipe is saved and its title is: ', recipe.title)))
    //   .catch(error => console.log('An error happened while saving new recipes:', error));

    // Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
    //   .then(recipe => console.log('This recipe duration was successfully updated to: ', recipe.duration))
    //   .catch(error => console.log('An error happened while updating a recipe:', error));

    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(recipe => console.log('This recipe was successfully deleted.'))
      .catch(error => console.log('An error happened while deleting a recipe:', error));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

