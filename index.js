const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = {
  title: "applePie",
  level: "Easy Peasy",
  ingredients: ["apple", "pie"],
  cuisine: "yes",
  dishType: "dessert",
  duration: 30,
  creator: "Steve Jobs",
  created: "1933-12-12",
};



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
  .then(() => {
    Recipe.create(newRecipe).then(dbSuccess => {
      console.log(dbSuccess.title);
    }).catch(dbError => {
      console.log(dbError);
    });
    Recipe.insertMany(data).then(dbSuccess => {
      dbSuccess.forEach(recipe => console.log(`title: ${recipe.title}`));
      Recipe.updateOne({
        title: "Rigatoni alla Genovese"
      }, {
        duration: 100
      }, {
        new: true
      }).then(dbResponse => {
        console.log("You updated Harry");
      }).catch(dbErr => {
        console.log(dbErr);
      });
      Recipe.deleteOne({
        title: "Carrot Cake"
      }).then(dbSuccess => {
        console.log("You deleted Harry");
        mongoose.connection.close();
      }).catch(dbErr => {
        console.log(dbErr);
      })
    }).catch(dbError => {
      console.log(dbError);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });