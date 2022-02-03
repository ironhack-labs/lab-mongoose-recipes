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
      //console.log('The recipe Name is: ', recipe);
      recipe.forEach(re => console.log(` Recipe Name: : ${re.title}`));

      const prom2 = Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}).then().catch();
      console.log("update done");

      const prom3 = Recipe.deleteOne({title: "Carrot Cake"}).then(() => {
        console.log("delete successful");
      }).catch(() => {
        console.log("delete failed");
      });

      Promise.all([prom1, prom2, prom3])
  .then(values => {


    mongoose.connection.close();
  })
  .catch(err => console.error(err));
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
