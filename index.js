const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Recipe
const myRecipe = new Recipe({
  title: 'Mascarpone Cheesecake Recipe',
  level: 'Easy Peasy',
  ingredients: ['400g mascarpone cheese', '200ml cream', '150g sugar', '3 eggs', '150ml milk', '1 spoon maizena', '150g cookies', '75g butter'],
  cuisine: 'Italian',
  dishType: 'dessert',
  image: 'https://www.pequerecetas.com/wp-content/uploads/2014/09/cheesecake-de-mascarpone.jpg',
  duration: 30,
  creator: 'Mamá Cocina'
});

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
    Recipe.deleteMany({});
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Iteration 2
    myRecipe
      .save()
      .then(newRecipe => console.log(`A new recipe was created: ${newRecipe.title}`))
      .then(() => {
        // Iteration 3
        Recipe.insertMany(data)
          .then(newdata => console.log(`Some new reciepes were added to the database: ${newdata}`))
          .then(() => {
            // Iteration 4
            Recipe.findOneAndUpdate({
                title: "Rigatoni alla Genovese"
              }, {
                duration: 100
              })
              .then(updatedRecipe => console.log(`Recipe updated correctly: ${updatedRecipe.duration}`))
              .then(() => {
                // Iteration 5
                Recipe.deleteOne({
                    title: 'Carrot Cake'
                  })
                  .then(() => console.log('An item was deleted'))
                  .catch(err => console.log(`Error while trying to delete the reciepe: ${err}`))
              })
              .catch(err => console.log(`Error while trying to update the recipe: ${err}`))
          })
          .catch(err => console.log(`Error while importing the recipes: ${err}`))
      })
      .catch(err => console.log(`Error while creating a new recipe: ${err}`))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })