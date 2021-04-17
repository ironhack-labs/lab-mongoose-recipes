const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// import Recipe from './models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');
const datasingle = require('./datasingle');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Promise.all([
      Recipe.syncIndexes(),
      Recipe.create(datasingle)
        .then((recipe) => {
          console.log('recipe created single:', recipe.title);
          return 'create done';
        })
        .catch((err) => {
          console.log(err);
          return 'create error';
        }),
      Recipe.insertMany(data)
        .then((recipes) => {
          recipes.forEach((recipe, i) =>
            console.log('created many:', i, recipe.title)
          );
          return 'insertMany done';
        })
        .catch((err) => {
          console.log(err);
          return 'insertMany error';
        }),
      Recipe.findOneAndUpdate(
        { title: 'Rigatoni alla Genovese' },
        { duration: 100 },
        { useFindAndModify: false }
      )
        .then((changed) => {
          console.log(
            'findOneAndUpdate sucess',
            changed.title,
            changed.duration
          );
          return 'findOneAndUpdate done';
        })
        .catch((err) => {
          console.log(err);
          return 'findOneAndUpdate error';
        }),
      Recipe.deleteOne({ title: 'Carrot Cake' })
        .then(() => {
          console.log('deleteOne sucess');
          return 'deleteOne done';
        })
        .catch((err) => {
          console.log(err);
          return 'deleteOne error';
        }),
    ]).then(() => {
      return mongoose.connection.close();
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
