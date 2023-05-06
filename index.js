const mongoose = require('mongoose');

mongoose.set('strictQuery', false) // ( I've put this line of code here because otherwise a "DeprecationWarning" appears on my terminal each time I run node index.js )

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

    //Iteration 2:
    let recipe1 = {
      "title": "Asian Glazed Chickennnnnnn",
      "level": "Amateur Chef",
      "ingredients": [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)"
      ],
      "cuisine": "Asian",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 40,
      "creator": "Chef LePapu"
    }

    return Recipe.create(recipe1)
  })
  .then((x)=>{
    console.log("Single recipe added: ", x)
  })
  //Iteration 3:
  .then(()=>{
    return Recipe.insertMany(data)
  })
  .then((x)=>{
    console.log("Array of recipes added: ", x)
  })
  //Iteration 4:
  .then(()=>{
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  })
  .then(()=>{
    console.log("Recipe updated successfully!")
  })
  //Iteration 5:
  .then(()=>{
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(()=>{
    console.log("Recipe deleted successfully!")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
