const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const strogonoff = new Recipe({
  title: "Strogonoff",
	level: "Easy Peasy",
	ingredients: ["Chicken", "Champignom", "Ketchup", "Garlic", "Mustard", "Onions", "Table Cream", "Pepper"],
	cuisine: "Brazillian",
	dishType: "Main_course",
	duration: 30,
	creator: "Chef Bruno",
})

const insertStrogonoff = () => {
  Recipe
    .create(strogonoff)
    .then(recipe => console.log(recipe.title))
    .catch(error => console.log(error));
}

const deleteRecipe = () => {
  Recipe
    .deleteOne({title: "Carrot Cake"})
    .then(() => {
      console.log("Recipe deleted")
      mongoose.disconnect();
    })
    .catch(error => console.log(error))
}

const uptadeRecipe = () => { 
  Recipe
    .findOneAndUpdate({
      title: "Rigatoni alla Genovese"
    }, {
      duration: 100
    }, {
      new: true
    })
    .then(updatedRecipe => {
      console.log("Updated Recipe:", updatedRecipe)
      deleteRecipe();
    })
    .catch(error => console.log(error))
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    insertStrogonoff()
    Recipe
    .insertMany(data)
    .then(recipes => {
      recipes.forEach(recipe => console.log(recipe.title));
      uptadeRecipe();
    })
    .catch(error => console.log(error));
    })
    .catch(error => {
      console.error('Error connecting to the database', error);
    });
    