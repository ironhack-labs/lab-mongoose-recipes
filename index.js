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
      let prom1 = Recipe.create(recipe)
        .then(recipe => console.log("The recipe is saved and its name is: ", recipe.title))
        .catch(error => console.log('An error happened while saving a new recipe:', error));

      let prom2 = Recipe.insertMany(data)
        .then(data.forEach(recipe => console.log(`Recipe : ${recipe.title}`)))
        .catch(error => console.log('An error happened while saving a new recipe:', error));

      let prom3 = Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
        .then(update => console.log("Rigatoni updated!"))
        .catch(error => console.log('An error happened while updating Rigatoni recipe:', error));

      let prom4 = Recipe.deleteOne({title: "Carrot Cake"})
        .then(recipe => console.log("Carrot Cake deleted!"))
        .catch(error => console.log('An error happened while updating Rigatoni recipe:', error));

      Promise.all([prom1, prom2, prom3, prom4])
        .then(function() {
          mongoose.connection.close();
          console.log('Mongoose connection disconnected');
        });
  })

  .catch(error => {
    console.error('Error connecting to the database', error)
  }); 

   
  const recipe = {
  title: "macarrones boloñesa",
  level: "Easy Peasy",
  ingredients: "tomate, cebolla, pasta, sal, pimienta" ,
  cuisine: "italiana",
  dishType: "main_course",
  duration: 45,
  creator: "Pepi"
  }


