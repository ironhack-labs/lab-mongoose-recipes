const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

let rebeccasRecipe = {
  title: "A simple cake",
  level: "Easy Peasy",
  ingredients: ["Water", "Sugar", "Oatmeal"],
  cuisine: "Swedish",
  dishType: "dessert",
  duration: 30,
}
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
    Recipe.create(rebeccasRecipe) //  Iteration 2  Create a recipe
      .then(recipe => {
        console.log(recipe.title)
        Recipe.insertMany(data) //  Iteration 3 – Insert multiple recipes
          .then(recipesInDb => {
            data.map(recipe => console.log(recipe.title))
            Recipe.updateOne({ //  Iteration 4 - Update recipe
                title: "Rigatona alla Genovese"
              }, {
                duration: 100
              }, {
                new: true
              })
              .then(() => {
                console.log("Duration changed")
                Recipe.deleteOne({ //  Iteration 5 - Remove a recipe
                    title: "Carrot Cake"
                  })
                  .then(recipe => {
                    console.log("Carrot Cake is removed from DB!")
                  }).catch(error => {
                    console.error(error);
                  })
              }).catch(error => {
                console.error(error);
              })
          }).catch(error => {
            console.error(error);
          })
      }).catch(error => {
        console.error(error);
      })
  })
  .catch(error => {
    console.error(error);
  })
//  Iteration 6 - Close the Database
// .finally(() => {
//   mongoose.connection.close();
// });