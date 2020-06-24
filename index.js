const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)

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
  .then(() => Recipe.create({
    title: "Fried Egg",
    level: "Easy Peasy",
    ingredients: [
      "1 egg",
      "oil",
    ],
    cuisine: "International",
    dishType: "main_course",
    image: "https://www.gimmesomeoven.com/wp-content/uploads/2017/04/How-To-Make-Fried-Eggs-Recipe-1.jpg",
    duration: 15,
    creator: "Laura del Toro"
  }))
  .then(recipe => console.log(`The new recipe is ${recipe.title}.`))
  .then(() => Recipe.create(data))
  .then(recipes => recipes.forEach((recipe, i) => console.log(`Recipe num ${i +1}: ${recipe.title}`)))
  .then(() => Recipe.findOneAndUpdate({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  }, {
    new: true
  }))
  .then(updatedRecipe => console.log(`${updatedRecipe.title} recipe updated succefully, the new duration is: ${updatedRecipe.duration}`))
  .then(() => Recipe.deleteOne({
    title: "Carrot Cake"
  }))
  .then(deletedRecipe => console.log("The recipe was deleted succesfully, these are the details:", deletedRecipe))
  .then(() => mongoose.connection.close(() => console.log("Mongoose connection disconected")))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });