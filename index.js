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
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe
      .create(
        { title: 'Hachis Parmentier', level:'Amateur Chef', ingredients: ['potatoes', 'beef', 'carrot', 'tomatoes', 'celery', 'milk'], cuisine: 'French', dishType: 'main_course', image: 'http://3.bp.blogspot.com/_MTDmVpkxNGM/TQoR4segKFI/AAAAAAAABXw/ZNgj_7_EOXc/s400/Hachis+Parmentier.jpg', duration: 60, creator: 'Anthony Guido', created: '2021-04-14'}
        )
      .then(recipe => console.log('You have successfully added a new recipe:', recipe.title))
      .catch(err => console.log('Something went wrong when adding a new recipe:', err))
      return Recipe.syncIndexes()
  })
  .then(() => {
    Recipe
      .insertMany(data)
      .then(data.forEach(recipe => console.log('You have successfully added a new recipe:', recipe.title)))
      .catch(err => console.log('Something went wrong when adding a new recipes:', err))
      return Recipe.syncIndexes()
  })
  .then(() => {
    Recipe
    .findOneAndUpdate({title: "Rigatoni alla Genovese"}, {$set:{duration:100}}, {new: true})
    .then(recipe => console.log('You have successfully updated this recipe:', recipe))
    .catch(err => console.log('Something went wrong when updating data!', err))
    return Recipe.syncIndexes()
  })
  .then(() => {
    Recipe.deleteOne({ title: 'Carrot Cake' })
    .then(recipe => console.log('You have successfully deleted this recipe:', recipe))
    .catch(err => console.log('Something went wrong when deleting this recipe!', err))
    return Recipe.syncIndexes()
  })
  .then(() => {
    mongoose.connection.close(function () {
      console.log('Mongoose connection is now close');
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });