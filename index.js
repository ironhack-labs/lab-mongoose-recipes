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
  //Iteración 2
  .then(() => {
    
    const polloRecipe = new Recipe({
      title: "Pollo frito",
      ingredients: ["pollo", "aceite"],
      cuisine: "international"
    })
    Recipe.create(polloRecipe)
    .then(recipe => console.log(`The recipe ${recipe.title} has been added correctly`))
  
   .catch(error => {
      console.error(error);
    })
  })
  .then(() =>{
  //iteracion 3
  Recipe.insertMany(data)
  .then (() => {
    Recipe.find()
    .then(recipes => {
      recipes.forEach(everyRecipe => console.log(`Recipe Name: ${everyRecipe.title}`))
    })
  })
})
  .then(() => {
 //Iteracion 4 
  Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duration:100})
  .then ((recipe) => console.log(`Recipe ${recipe.title} updated succesfuly!`))
 })
 .then(() => {
 // iteracion 5
 Recipe.deleteOne({title: "Carrot Cake"})
 .then(() => {
   console.log("Recipe deleted succesfuly")
 //Iteracion 6
 mongoose.connection.close()
 })
 .catch(error => {
  console.error(error);
})
.catch(error => {
  console.error(error);
})
.catch(error => {
  console.error(error);
})
 
})


 //DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated