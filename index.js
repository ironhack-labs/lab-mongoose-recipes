const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

let newRecipe = {
  title: 'Quick and Easy Pizza Crust',
  level: 'Amateur Chef',
  ingredients: [
    '1 (.25 ounce) package active dry yeast',
    '1 teaspoon white sugar',
    '1 cup warm water (110 degrees F/45 degrees C)',
    '2 1/2 cups bread flour',
    '2 tablespoons olive oil',
    '1 teaspoon salt'
  ],
  cuisine: 'Italian',
  dishType: 'main_course',
  image: 'https://images.media-allrecipes.com/userphotos/2326147.jpg',
  duration: 30,
  creator: 'CHEF RIDER'
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
    let promise1, promise2, promise3, promise4;

    // Iteration 2
    promise1 = Recipe
      .create(newRecipe)
      .then((recipe) => {
        console.log(`Recipe title: ${recipe.title}`)
      })
      .catch((err) => {
        console.log(err)
      });

    //Iteration 3
    promise2 = Recipe
      .insertMany(data)
      .then((recipes) => {
        recipes.forEach(recipe => {
          console.log(`Recipe title: ${recipe.title}`)
        })
      })
      .catch((err) => {
        console.log(err)
      });

    //Iteration 4
    promise3 = Recipe 
      .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      .then((recipe) => {
        console.log(`Recipe "${recipe.title}" duration updated to ${recipe.duration}`)
      })
      .catch((err) => {
        console.log(err)
      });

    //Iteration 5
    promise4 = Recipe
      .deleteOne({ title: 'Carrot Cake' })
      .then(() => {
        console.log('"Carrot Cake" has been removed')
      })
      .catch((err) => {
        console.log(err)
      });

    Promise.all([promise1, promise2, promise3, promise4])
      .then(() => {
        mongoose.connection.close();
      })
      .catch(() => {
        mongoose.connection.close();
      });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });