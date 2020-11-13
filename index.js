const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { deleteMany } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const recipesArray = require('./data.json');

// Connection to the database "recipe-app"

const promise1 = mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    // return self.connection.dropDatabase();
  })
  .then(() => {
   return Recipe.create({
      title: 'Yummy recipe',
      cuisine: 'Very yummy cuisine',
    }).then((recipe) => console.log(recipe));
  })
  .then(() => {
    return Recipe.insertMany(recipesArray).then((recipe) => console.log(recipe));
  })
  .then(() => {
    return Recipe.updateOne(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    ).then(console.log('Success!'));
  })
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' }).then(
      console.log('Sucessfully deleted!')
    );
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

Promise.all([promise1]).then(() => {
  mongoose.connection.close();
});
