const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const recipe1 = {
  title: 'Asian Glazed Chicken Thighs2',
  level: 'Amateur Chef',
  ingredients: [
    '1/2 cup rice vinegar',
    '5 tablespoons honey',
    '1/3 cup soy sauce (such as Silver Swan®)',
    '1/4 cup Asian (toasted) sesame oil',
    '3 tablespoons Asian chili garlic sauce',
    '3 tablespoons minced garlic',
    'salt to taste',
    '8 skinless, boneless chicken thighs',
  ],
  cuisine: 'Asian',
  dishType: 'main_course',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu',
};

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
/*
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    mongoose.connection.db
      .dropDatabase()
      .then(() => {
        Recipe.create(recipe1)
          .then(() => {
            console.log(recipe1.title);
          })
          .catch((error) => {
            console.log(error);
          });

        Recipe.insertMany(data)
          .then((newDoc) => {
            newDoc.forEach((i) => console.log(i.title));

            Recipe.findOneAndUpdate(
              { title: 'Rigatoni alla Genovese' },
              { duration: 100 }
            )
              .then(() => {
                console.log(
                  'Rigatoni alla Genovese recipe updated successfully!'
                );
              })
              .catch((error) => {
                console.log(error);
              });

            Recipe.deleteOne({ title: 'Carrot Cake' })
              .then(() => {
                console.log('Carrot Cake deleted successfully!');
                mongoose.connection.close();
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
*/

//Aync await

async function seedDatabase() {
  try {
    const dbconnection = await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    //Delete all the recipes in the DB
    await Recipe.deleteMany();
    //Create one recipe
    const createOneRecipe = await Recipe.create(recipe1);
    console.log(createOneRecipe.title);
    //Create many recipes
    const createdRecipes = await Recipe.create(data);
    createdRecipes.forEach((recipe) => {
      console.log(recipe.title);
    });
    //Update one recipe
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { useFindAndModify: false, new: true }
    );
    console.log(updatedRecipe.duration);
    //Delete one recipe
    const deletedRecipe = await Recipe.deleteOne({ title: 'Carrot Cake' });
    console.log(deletedRecipe);
    console.log('Recipe deleted successfully!');

    //close DB connection
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
}

seedDatabase();
