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
    
    const prom1 = Recipe.create(data, (error, recipe) => {
      if (error) {
        console.log('An error happened:', error);
        return;
      }
      recipe.forEach(re => console.log(` Recipe Name: : ${re.title}`));
      console.log('The user is saved and its value is: ', recipe);
      
      const filter = {title: "Rigatoni alla Genovese"};
      const duration = {duration: "100"};
      const prom2 = Recipe.findOneAndUpdate(filter, duration)
      .then(result => console.log("we updated it!!"))
      .catch();
      
      const prom3 = Recipe.deleteOne({title: 'Carrot Cake'})
      .then(result => console.log("it's deleted"))
      .catch()

      Promise.all([prom1, prom2, prom3])
        .then ((values) => mongoose.connection.close())
    });
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
