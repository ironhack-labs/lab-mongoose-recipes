const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

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
    const newRecipe = {
      title: "Waakye",
      level: "Amateur Chef",
      ingredients: [
        "1 cup dried black eyed beans/ peas soaked overnight",
        "2 cups rice",
        "8-10 dried millet stalk leaves",
        "water for cooking",
        "salt as required",
      ],
      cuisine: "Ghanaian",
      dishType: "main_course",
      image: "https://eatwellabi.com/wp-content/uploads/2021/09/Waakye-13.jpg",
      duration: 120,
      creator: "Joseph && Bright"
    }

    return Recipe.create(newRecipe)
  })
  .then(createdRecipe => {
    console.log('Title of the unique created reciple ', createdRecipe.title)
    return Recipe.insertMany(data)
  })
  .then(importedRecipes => {
    importedRecipes.forEach((recipe, index) => {
      console.log(`Title of imported recipe ${index + 1} : ${recipe.title}`)
    });

    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  })
  .then((updatedRecipe) => {
    console.log(`successfully updated recipe ${updatedRecipe.title} duration to ${updatedRecipe.duration}`);

    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then(() => {
    console.log(`Succesfully deleted Carrot Cake recipe`);

    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Successfully closed database')
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
