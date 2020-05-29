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
  .then(() => {
    Recipe
      .create({
        title: "Baguette French Toast",
        level: "Amateur Chef",
        ingredients: [
          "1 stale baguette",
          "2 eggs",
          "1 1/2 cups of milk",
          "1 teaspoon of baking powder",
          "1 pinch of salt",
          "2 tablespoons of sugar",
          "Vanilla extract",
          "Sunflower oil"
        ],
        cuisine: "French",
        dishType: "Breakfast",
        image: "https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F5c694217-aeac-400a-98ac-eb4539670c2d.2Ejpeg/748x372/quality/90/crop-from/center/pain-perdu.jpeg",
        duration: "40",
        creator: "Mom ♥️"
      })
      .then((newRecipe) => {
        console.log("A new recipe was created: ", newRecipe.title);
      })
      .catch((err) => {
        console.log(err);
      })

    Recipe
      .insertMany(data)
      .then((dataProjected)=> {
        return Recipe.find()
          .select("title")
          .then((recipesProjected)=> {
            console.log("The following recipes were added: ", recipesProjected);
          })
      })
      .catch((err) => {
        console.log(err);
      })

    .then(() => {
      return Recipe
      .findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
      .then((updatedRecipe) => {
        console.log(updatedRecipe.title, "was updated")
      })
      .catch((err) => {
        console.log(err)
      })
    })

    .then(() => {
      return Recipe
      .deleteOne({title: "Carrot Cake"}, {new: true})
      .then((deletedRecipe) => {
        console.log("A recipe was deleted")
      })
      .catch((err) => {
        console.log(err)
      })
    })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
});
