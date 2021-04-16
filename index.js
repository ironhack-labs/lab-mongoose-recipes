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
    return Recipe.create({
      title: 'FOOOOD',
      cuisine: 'Asian'
    })
  }).then(newRecipe => {
    console.log(`New Recipe ${newRecipe.title}`)
    return Recipe.insertMany(data)
  }).then(allRecipes => {
    console.log(`new recipes:`);
    allRecipes.forEach(re => console.log(re.title))
    return Recipe.findOneAndUpdate({
      title: 'Rigatoni alla Genovese'
    }, {
      duration: 100
    }, {
      new: true
    })
  }).then(updatedRe => {
    console.log(`the recipe "${updatedRe.title}" got updated`)
    return Recipe.deleteOne({
      title: 'Carrot Cake'
    })
  }).then(deletedRe => {
    console.log(`recipe got deleted`)
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });