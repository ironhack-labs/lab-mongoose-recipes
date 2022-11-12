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
  //   Recipe.create({
  //   "title": "Asian Glazed Chicken Thighs",
  //   "level": "Amateur Chef",
  //   "ingredients": [
  //     "1/2 cup rice vinegar",
  //     "5 tablespoons honey",
  //     "1/3 cup soy sauce (such as Silver Swan®)",
  //     "1/4 cup Asian (toasted) sesame oil",
  //     "3 tablespoons Asian chili garlic sauce",
  //     "3 tablespoons minced garlic",
  //     "salt to taste",
  //     "8 skinless, boneless chicken thighs"
  //   ],
  //   "cuisine": "Asian",
  //   "dishType": "main_course",
  //   "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  //   "duration": 40,
  //   "creator": "Chef LePapu"
  //   })
  // .then(recipeTitle => console.log(recipeTitle.title))
  // .catch(err => console.log(err))

  Recipe.insertMany(data)
  //   .then(recipe => recipe.forEach(recipeTitle => console.log(recipeTitle.title)))
  //   .catch(err => console.log(err))
  

    .then(() => {
      Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: "100"}, {new: true})
      .then(update => console.log("Update in duration was successful!"))
      .catch(err => console.log(err))  
    })
    
    .then(() => {
      Recipe.deleteOne({title: "Carrot Cake"})
      .then(deleting => console.log("Delete of Carrot cake was successful!"))
      .then(() => mongoose.connection.close())
      .catch(err => console.log(err))
    })
  })

  .catch(error => { 
    console.error('Error connecting to the database', error);
  });
