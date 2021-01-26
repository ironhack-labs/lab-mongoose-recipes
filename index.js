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
  /*
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {
    const firstData = {
      title: 'Nothing',
      level: 'Easy Peasy',
      ingredients: ['water', 'salt'],
      cuisine: 'Single',
      dishType: 'other',
      duration: 1,
      creator: 'mario',
    };
    Recipe.create(firstData)
    .then(recipe => console.log('First recipe is saved and its value is: ', recipe.title))
    .catch(error => console.log('An error happened while saving a new recipe:', error));
  }) 
  
  .then(() => {
    Recipe.insertMany(data)
    .then(recipe => console.log('Recipes are saved and values are: ', data.map(doc => doc.title).sort()))
    .catch(error => console.log('An error happened while saving a new recipe:', error));
  })

  .then(() => {
    let newValue = 100;
    let updateTitle = "Rigatoni alla Genovese";
    Recipe.updateOne({ title: updateTitle }, { duration: newValue })
    .then(recipe => console.log(`Recipe ${updateTitle} updated, new value is: `, newValue))
    .catch(error => console.log(`An error happened while updating ${updateTitle} recipe:`, error));
  })
  */
  .then(() => {
    let deleteValue = 'Carrot Cake'
    Recipe.deleteOne({ title: deleteValue })
      .then(recipe => console.log(`Recipe ${deleteValue} successfully deleted`))
      .finally(() => {
        mongoose.connection
          .close()
          .then(() => console.log("DB disconnected"))
          .then(() => process.exit());
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

process.on("SIGINT", () => {
 mongoose.connection
 .close()
 .then(() => console.log("Disconnected on SIGINT"))
 .then(() => process.exit());
}); 
