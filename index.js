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
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Shortbread Cookies',
      level: 'Easy Peasy',
      ingredients: ['1/2 cup confectioners sugar', '10 tbsp unsalted butter', '1/2 tsp vanilla extract', '1 1/2 cups all-purpose flour'],
      cuisine: 'British',
      dishType: 'dessert',
      duration: 20,
      creator: 'Chantel'
    })
    .then (recipe => {
      console.log(`Recipe has been created`)
      Recipe.insertMany(data)
      .then(recipes => {
        recipes.forEach(recipe => {
        console.log(recipe.title)
      })
    })
    .then(recipe => {
      Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese', duration: 100})
      })
      .then(console.log (`successfully updated Rigatoni alla Genovese's duration`))
    })
    .then(recipe => {
      Recipe.deleteOne({title: 'Carrot Cake'})
      .then(console.log(`successfully deleted Carrot Cake`))
      mongoose.connection.close()
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
