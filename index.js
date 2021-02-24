const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

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
    // Run your code here, after you have insured that the connection was made
    //ITERATION 2 : CREATE A RECIPE
    Recipe.create({
      "title": "Carrot Cake",
      "level": "Amateur Chef",
      "ingredients": [
        "6 cups grated carrots",
        "1 cup brown sugar",
        "1 cup raisins",
        "4 eggs",
        "1 1/2 cups white sugar",
        "1 cup vegetable oil",
        "2 teaspoons vanilla extract",
        "1 cup crushed pineapple, drained",
        "3 cups all-purpose flour",
        "1 1/2 teaspoons baking soda",
        "1 teaspoon salt",
        "4 teaspoons ground cinnamon"
      ],
      "cuisine": "International",
      "dishType": "dessert",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
      "duration": 130,
      "creator": "Chef Nadia"
    })
    .then(recipe => {
      console.log(`newRecipe: ${recipe.title}`)
    })
  }
  )
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });


  // ITERATION 3

recipe.insertMany(data)
    .then(recipes => {
      recipes.forEach(recipe => {
        console.log(`recipe ${recipe.title}`)
      })
.catch(error => {
  console.error('Error connecting to the database', error);
})


/*ITERATION 4

recipe.findOneAndUpdate(data)
.then((result) => {

}
Model.findOneAndUpdate(query, { $set: { name: 'jason bourne' }}, options, callback) */