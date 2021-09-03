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

  .then(() => {
      return Recipe.create(recipe)})

  .then(newRecipe => console.log("The recipe is saved and its name is: ", newRecipe.title))
  
  
  .then(() => {
      return Recipe.insertMany(data)})

  .then(data.forEach(recipe => console.log(`Recipe : ${recipe.title}`)))

  .then(() => {
      return Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})})

  .then(updatedRecipe => console.log("Rigatoni updated!: " , updatedRecipe))

  .then(() => {
      return Recipe.deleteOne({title: "Carrot Cake"})})

  .then(recipeDeleted => console.log("Carrot Cake deleted!"))

  .catch(error => {
    console.error('Error connecting to the database', error)
  }); 

  mongoose.connection.close()

   
  const recipe = {
  title: "macarrones boloñesa",
  level: "Easy Peasy",
  ingredients: "tomate, cebolla, pasta, sal, pimienta" ,
  cuisine: "italiana",
  dishType: "main_course",
  duration: 45,
  creator: "Pepi"
  }


