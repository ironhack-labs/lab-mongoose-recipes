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
    console.log(`Connected to the database: "${self.connection.name}"`)
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase()
  })
  .then(async () => {
    const recipeTabouleh = {
      title: 'Tabouleh',
      level: 'Easy Peasy',
      ingredients: ['Parsley', 'Tomatoes', 'Olive oil', 'Burgul'],
      cuisine: 'Lebanese',
      dishType: 'Salad',
      duration: 15,
      creator: 'Jamal Nasser',
    };
    try {
      const addTabouleh = await Recipe.create(recipeTabouleh);
      console.log(addTabouleh.title);

      const recipeMany = await Recipe.insertMany(data);
      recipeMany.forEach(recipe => console.log(recipe.title));

      const updateRecipe = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { $set: { duration: 100 } },
        { new: true },
      );
      console.log(`The duration has been updated successfuly to ${updateRecipe.duration}`);

      const removeRecipe = await Recipe.deleteOne(
        { title: "Carrot Cake" },
      );
      console.log(`The carrot cake is not available anymore, it is removed`);

      mongoose.connection.close();

    } catch (err) {
      console.log(error)
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error)
  })
