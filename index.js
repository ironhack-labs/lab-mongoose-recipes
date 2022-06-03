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
    // create a recipe
    let quesadillaRecipe = {
      "title": "Quesadilla",
      "level": "Easy Peasy",
      "ingredients": [
        "200gr of oaxaca cheese",
        "2 corn tortilas",
      ],
      "cuisine": "Mexican",
      "dishType": "snack",
      "image": "https://www.t-fal.com.mx/medias/?context=bWFzdGVyfHJvb3R8MTE4NTF8aW1hZ2UvanBlZ3xoNWYvaDBiLzEyNzY2NTg3ODc5NDU0LmpwZ3w5YTcxMzIxMTkyOTVhMjc4NjVhNzc5YWZlYTFmZWEzMjJjMjM4OTkwNjk0MzRkMDJlNTkwYjhiNDI1YWJmODdl",
      "duration": 250,
      "creator": "Chef Pedro"
    }
    Recipe
    .create(quesadillaRecipe)
    .then((quesadillaRecipe) => console.log("added recipe ", quesadillaRecipe.title))
    .catch((err) => console.log(err))
  })
.then(()=>{
    //add other recipes
    Recipe
    .insertMany(data)
    .then((recipe)=> recipe.forEach((value)=> console.log("inserted ", value.title)))
    .catch((err) => console.log(err))
  })

  .then(()=>{
    //findOneAndUpdate
    Recipe
    .updateOne( { title: "Rigatoni alla Genovese"}, {duration: 100})
    .then(() => console.log("Success finding one recipe and updating"))
    .catch((err) => console.log(err)) 
  })
  .then(()=>{
    //Remove a recipe
    Recipe
    .deleteOne({ title: "Carrot Cake"})
    .then(() => console.log("Success deleting recipe"))
    .catch((err) => console.log(err))
  })
  .catch(error => {
  console.error('Error connecting to the database', error);
  });

  mongoose.connection.close(() => {
    console.log('Mongoose donnection closed')
  })
  
