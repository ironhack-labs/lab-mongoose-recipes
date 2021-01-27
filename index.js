const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const firstData = {
      title: 'Food for dummies',
      level: 'Easy Peasy',
      ingredients: ['water', 'salt'],
      cuisine: 'Single',
      dishType: 'other',
      duration: 1,
      creator: 'mario',
    };

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose.set('useFindAndModify', false)

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`1-Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create(firstData)
    .then(recipe => console.log('2-First recipe is saved and its value is: ', recipe.title))
    .then(() => {
      Recipe.insertMany(data)
      .then(recipe => console.log('3-Recipes are saved and values are: ', data.map(doc => doc.title).sort()))
      .then(() => {
        let newValue = 100;
        let updateTitle = "Rigatoni alla Genovese";
        let deleteValue = 'Carrot Cake'

        Recipe.updateOne({ title: updateTitle }, { duration: newValue })
        .then(recipe => console.log(`4-Recipe ${updateTitle} updated, new value is: `, newValue))
        .catch(error => console.log(`4-An error happened while updating ${updateTitle} recipe:`, error));

        Recipe.deleteOne({ title: deleteValue })
        .then(recipe => console.log(`5-Recipe ${deleteValue} successfully deleted`))
        .finally(() => {
          mongoose.connection
            .close()
            .then(() => console.log("6-All tasks finished. DB disconnected"))
            .then(() => process.exit());
        })
      })
      .catch(error => console.log('3-An error happened while saving a new recipe:', error));
    })
    .catch(error => console.log('2-An error happened while saving a new recipe:', error));
  })
  .catch(error => {
    console.error('1-Error connecting to the database', error);
  })

process.on("SIGINT", () => {
 mongoose.connection
 .close()
 .then(() => console.log("Disconnected on SIGINT"))
 .then(() => process.exit());
}); 
