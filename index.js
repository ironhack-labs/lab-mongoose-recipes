const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
  
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  // iteratión 2 - insert one recipe
  .then(() => {
    

   const myRecipe={
      title: "Healthy oat chocolate cake",
      level: "Easy Peasy",
      ingredients: [
        "cup oats",
        "eggs",
         "bananas",
         "cup coconut oil",
         "vanilla esence",
         "tablespoons minced garlic",
         "cup yeast",
         "chocolate 100%",
         "apricot to decorate",
      ],
      cuisine: "French",
      dishType: "snack",
      duration: 35,
      creator: "Chef Nina",
    }

    return Recipe.create(myRecipe)
  })

.then((myRecipe)=> console.log(myRecipe.title))

.then  (() => {
  return Recipe.insertMany(data)
})

 
  .then((recipes) => recipes.forEach((recipe) => console.log("New recipe: " + recipe.title)))

  .then(() => Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }))

	.then(() => console.log("Updated!"))

	.then(() => {
		return Recipe.deleteOne({ title: "Carrot Cake" })
	})
	.then(() => console.log("deleted!"))

	.catch((error) => {
		console.error("Error connecting to the database", error)
	})

	.finally(() => mongoose.connection.close())