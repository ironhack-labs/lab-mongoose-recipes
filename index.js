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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  // ITERACION 2
  .then(() => {
   Recipe.create({
      title: "empanadas",
      level: "Amateur Chef",
      ingredients: [
        "1kg de Carne picada", 
        "1kg Cebolla",
         "6 Huevos", 
         "Tapas de empanadas",
         "3 cucharadas de comino"
      ],
      cuisine: "Argentinian",
      dishType: "main_course",
      duration: 120,
      creator: "Unkown",
    })
    .then(() => {console.log(`New recipe`);
  })
  recipe.insertMany(data)
.then(recipe =>{ 
  recipe.forEach(recipe =>{
    console.log(recipe.title)
  })
  .then(() => {
    recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    })
    .then(() => {
      console.log("Succesfully updated")
    })
    .then(() => {
      recipe.deleteOne({title: "Carrot Cake"})
        })
        .then(() => {
          console.log("Successfully removed")
        })
        .then(() => {
          mongoose.disconnect();
        })
    .catch(error => {
      console.error('Error connecting to the database', error)
    })