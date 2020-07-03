const mongoose = require('mongoose');
const process = require('process')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const newRecipe = require('./newRecipe')

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
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.deleteMany({})

    Recipe.create(data)
      .then(recipe => {
        console.log('Create First Recipes')
        // console.log(data);
      })
      .then(() => {
        Recipe.insertMany(newRecipe)
          .then(newRec => {
            console.log('InsertMany New Recipe')
          })
          .then(() => {
            Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
              .then(() => console.log('Updated Duration'))
              .catch(error => console.log('An error happened while update duration:', error));
          })
          .then(() => {
            Recipe.find({}, 'title duration -_id')
              .then(title => {
                console.log('Find', title);
              })
              .catch(error => console.log('An error happened while find title:', error));
          })
          .catch(error => console.log('An error happened while insert:', error));
      })
      .catch(error => console.log('An error happened while saving a new user:', error));


  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
