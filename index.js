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
    let savedRecipe = Recipe.create( {
      title: "Borscht",
      level: "Easy Peasy",
      ingridients: ["Onion", "Beet", "Beef", "Cabbage", "Carrot", "Potato", "Tomato sauce", "Basil leave", "Salt & Pepper", "Fresh dill"],
      cuisine: "Ukrainian",
      dishType: "soup",
      image: "https://instantpoteats.com/wp-content/uploads/2017/06/instant-pot-borscht-beet-soup-feature.jpg",
      duration: 2,
      creator: "Ukrainians"
    })
    console.log(savedRecipe)
  })
  .then((savedRecipe) => {
    console.log(`New recipe ${savedRecipe} was added to database`)
    return Recipe.insertMany(data);
  })
  .then((RecipeList) => {
        RecipeList.forEach((r) => {
          console.log(r.title)
        });
        return Recipe.findOneAndUpdate(
          {title: "Rigatoni alla Genovese"},
          {duration: 100}
        )
  })
.then(() => {
  console.log("The Rigatoni alla Genovese Recipe had been updated successfully!")
  return Recipe.deleteOne({title: "Carrot Cake"})
})
.then(() => {
  console.log("Carrot Cake recipe was deleted successfully!")
  return mongoose.connection.close()
})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



 