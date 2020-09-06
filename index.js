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
    useUnifiedTopology: true,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async () => {
    const newRecipe = {
      title: 'Tapioca',
      level: 'Easy Peasy',
      ingredients: ['tapioca', 'cheese', 'eggs'],
      cuisine: 'brasilian',
      dishType: 'breakfast',
      image: 'https://varginhadigital.com.br/wp-content/uploads/2018/10/tapioca-queijo-ovos-FILEminimizer.jpg',
      duration: 10,
      creator: 'Portugueses',
    };

    try {
      const createdRecipe = await Recipe.create(newRecipe);
      console.log(`Inserted one new Recipe => ${createdRecipe.title}`);

      const manyNewRecipe = await Recipe.insertMany(data);
      console.log('Finished inserting many Recipes');
      manyNewRecipe.forEach(recipe => console.log(recipe.title));

      const updatedRecipe = await Recipe.findOneAndUpdate(
        { title: 'Rigatoni alla Genovese' },
        { $set: { duration: 100 } },
        { new: true, useFindAndModify: false },
      );
      console.log(`Successfully updated recipe ${updatedRecipe.title}`);

      const deletedRecipe = await Recipe.deleteOne({ title: 'Carrot Cake' });
      console.log('Successfully deleted recipe');

      mongoose.connection.close();
    } catch (error) {
      console.log(error);
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
