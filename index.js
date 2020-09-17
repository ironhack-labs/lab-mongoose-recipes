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
  .then(async () => {
    const newRecipe = {
      title: 'Pasta',
      level: 'Easy Peasy',
      ingredients: ['Pasta', 'Tomatoes'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 20,
      creator: 'Grazielli',
    };

    try {
      const createdRecipe = await Recipe.create(newRecipe);
      console.log(createdRecipe.title);

      const manyNewRecipes = await Recipe.insertMany(data);
      console.log('Inserted many recipes');
      manyNewRecipes.forEach(recipe => console.log(recipe.title));

      const deletedRecipe = await Recipe.deleteOne(
        { title: 'Carrot Cake' },
      );
    
      console.log(deletedRecipe);

    } catch (error) {
      console.log(error);
    }

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { $set: { duration: 100 } },
      { new: true, useFindAndModify: false },
    );
    console.log(updatedRecipe.title);

    mongoose.connection.close();

  })

  // .catch(error => {
  //   console.log('Error connecting to the database', error);
  // });
