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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  // Iteration 2 - Create a recipe
  .then(() => {
    Recipe.create({
      title: "Bahn Mi",
      level: "Amateur Chef",
      ingredients: [ 
        "1 cup White Rice Vinegar CBT",
        "1 cup Water, municipal",
        "1 cup Sugars, granulated",
        "1 cup Carrots, raw",
        "1 Chicken, broilers or fryers, breast, meat only, raw",
        "1 pinch Garlic Salt GL 0130 HS",
        "1 pinch Spices, pepper, black",
        "1 (12 inch) baguette"
      ],
      cuisine: "Vietnamese",
      dishType: "other",
      image: "https://prods3.imgix.net/images/articles/2016_05/Featured-Article-Herb-Sandwich-Banh-Bahn-Mi-Dinner-Party-Vietnamese-Sandwiches-Fired-Fish-Recipes.jpg",
      duration: 20,
      creator: "Chef Kim"
    })
    .then(recipe => console.log(recipe.title))
    .catch(err => console.log('error: ', err));
  })

  // Iteration 3 - Insert multiple recipes
  .then(() => {
    Recipe.insertMany(data)
    .then(allRecipes => allRecipes.forEach(recipe => {console.log(`This is recipe is called: ${recipe.title}`)}))
    .catch(err => console.log('error: ', err));
  })


  // Iteration 4 - Update recipe
  Recipe.findOneAndUpdate(
    { title: "Rigatoni alla Genovese" },
    { duration: 100 },
    { new: true }
  )
    .then((updatedRecipe) => console.log(`The recipe ${updatedRecipe.title} has been updated succesfully!`, updatedRecipe))


  // Iteration 5 - Remove a recipe
  Recipe.deleteOne(
    { title: "Carrot Cake" }
  )
    .then((deletedRecipe) => console.log(`The recipe ${deletedRecipe.title} has been deleted!`, deletedRecipe))

  // Iteration 6 - Close the Database
  // .then(() => {
  //   console.log(`Close DB`);
  //   mongoose.connection.close();
  // })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
