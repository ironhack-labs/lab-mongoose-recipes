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
    const recipe1 = {
      "title": "Pauls and Bartosz Favorite Chicken",
      "level": "Amateur Chef",
      "ingredients": [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      "cuisine": "Asian",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 40,
      "creator": "Chef LePapu"
    }
    return Recipe.create(recipe1)
  })
  .then((recipeFromDb) => {
    console.log(recipeFromDb.title)
   return Recipe.insertMany(data)
  })
  .then((recipesFromDb) =>{
    recipesFromDb.forEach((recipe)=>{
      console.log(recipe.title)
    })
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {$set:{duration:100}}, { returnDocument: 'after' })
  })
  .then(()=>{
    console.log("succesfully updated duration")
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(()=>{
    console.log("succesfully removed")
    mongoose.connection.close(() => {
      console.log('Mongoose disconnected on app termination');
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
