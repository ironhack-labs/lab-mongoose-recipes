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
    return Recipe.create({title: "Albondigas", level: "Amateur Chef", ingredients: ["Meat", "vegetables", "beef stock", "rice"], cuisine: "Española" })
  })
    .then((recipe) => {
    console.log(recipe.title)
    return Recipe.insertMany(data)
  })
    .then((recipes) => {
    recipes.forEach((recipe) => console.log(recipe.title))
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true})
  }).then((updatedRecipe)=> {
    console.log(`Recipe updated! ${updatedRecipe.title}`)
    return Recipe.deleteOne({Tittle: "Carrot Cake"})
  }).then ((deletedRecipe)=>{
    console.log(`The recipe ${deletedRecipe.title} has been deleted`)
  })
  .catch(error => console.error('Error connecting to the database', error))
  .finally(()=> {
    mongoose.conection.close(()=>{
      console.log("Disconected from the database")
      process.exit(0)
    })
  })
