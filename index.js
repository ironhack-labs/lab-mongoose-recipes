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
    console.log("Data created with old connections are deleted!");
    const dataRecipe = {
      title: "French Toast",
      level: "Easy Peasy",
      ingredients:["8 slices of bread (brioche or challah works well)",
      " 2 eggs",
      "1 cup heavy cream",
      "1 teaspoon vanilla",
      "1 teaspoon cinnamon",
      "1 tablespoon maple syrup, plus more for serving",
      "1 cup fresh blueberries",
      "1 tablespoon lemon juice",
      "2 tablespoon sugar",
      "vanilla ice cream"],
      cuisine:"French",
      dishType:"breakfast",
      image:"https://data.thefeedfeed.com/recommended/15279499355b12aa6f35a82.jpg",
      duration:10,
      creator:"Chef Haridha and Joao"

    }
    return Recipe.create(dataRecipe);
  })
  .then((RecipeFromDb)=>{
    console.log(RecipeFromDb.title);
    return Recipe.insertMany(data);
  })
  .then((dataArray)=>{
    dataArray.forEach(element =>{
      console.log(element.title);
    });
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duration: 100}, {returnDocument: 'after' });
  })
  .then((updatedData)=>{
    console.log(`Duration for ${updatedData.title} is updated successfully`);
    return Recipe.find({title: "Carrot Cake"});
  })
  .then((dataToBeDeleted) => {
    console.log(dataToBeDeleted[0].title);
    return Recipe.deleteOne(dataToBeDeleted[0])
  })
  .then(()=>{
    console.log("Data Deleted Successfully!");
  }).then(()=>{
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
