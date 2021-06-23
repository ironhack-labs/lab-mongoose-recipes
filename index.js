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
  // .then(() => {
  //   return Recipe
  //   .create(
  //     [{
  //       "title": "Asian Glazed Chicken Thighs",
  //       "level": "Amateur Chef",
  //       "ingredients": [
  //         "1/2 cup rice vinegar",
  //         "5 tablespoons honey",
  //         "1/3 cup soy sauce (such as Silver Swan®)",
  //         "1/4 cup Asian (toasted) sesame oil",
  //         "3 tablespoons Asian chili garlic sauce",
  //         "3 tablespoons minced garlic",
  //         "salt to taste",
  //         "8 skinless, boneless chicken thighs"
  //       ],
  //       "cuisine": "Asian",
  //       "dishType": "main_course",
  //       "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  //       "duration": 40,
  //       "creator": "Chef LePapu"
  //     }]
  //   )
  //   .then(recipe=> console.log('una ricetta', recipe[0].title))
  // })
  .then(() => {
    return Recipe
      .create(data)
      .then(recipe => console.log('ricette', recipe))
  })
  .then(() => {
    return Recipe
      .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(info => console.log(info, 'was successfully Updated!'))
  })

  .then(() => {
    return Recipe
      .deleteOne({ title: "Carrot Cake" })
      .then(recipe => console.log(recipe, 'was successfully Deleted!'))//How can I see the item that was deleted and not just the index?
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// Iteration 5 - Remove a recipe
// Oh oh! 
// The Carrot Cake is no longer available, 
// so we need to remove it from the database.
// Using the Model.deleteOne static, 
// remove that recipe from the database and display a success message after doing it!