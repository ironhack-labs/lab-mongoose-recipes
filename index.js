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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
// create recipe
  (async () => {
    try {
      const recipe = await Recipe.create({
        title: "spaghetti",
        cuisine: "italian"
    
      });
      console.log(`This recipe was save: ${recipe.title}`);
    } catch (error) {
      console.log(error.message);

    }
  })();
//insertMany
(async () => {
  try {
    const dataRecipes = await require(__dirname+"/data.json")
    const recipes = await Recipe.insertMany(dataRecipes)
    console.log
    console.log("Recipes added");
  } catch (error) {
    console.log(error.message);

  }
})();

//update recipe
(async () => {
  try {
    const recipie = await Recipe.findOneAndUpdate({title:"rigatoni alla genovese"}, {duration: 100})
    console.log("Rigatoni alla Genovese was updated");
  } catch (error) {
    console.log(error.message);
  }
})();

//remove one

(async () => {
  try {
    const recipie = await Recipe.deleteOne({title:"Carrot Cake"})
    console.log("Carrot Cake was removed");
  } catch (error) {
    console.log(error.message);
  }
})();

//close the database


