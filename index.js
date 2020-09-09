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
  .then(() => {
    return Recipe.create([{
      title: "Test",
      level: "Easy Peasy",
      ingredients: ['Test1', 'Test2'],
      cuisine: "American",
      dishType: "Cold",
      duration: 30,
      creator: "Damián Lago",
      created: Date.now()
    }])
  })
  .then(newRecipe => console.log(
    newRecipe[0].title
  ))
  .then(() => Recipe.insertMany(data))
  .then(data => data.forEach(elm => console.log(elm.title)))
  .then(() => Recipe.findOneAndUpdate({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  }, {
    new: true
  }))
  .then(update => console.log("Suscefully Update", update))
  .then(() => Recipe.deleteOne({
    title: "Carrot Cake"
  }))
  .then(() => console.log("Suscefully Deleted"))
  .then(() => mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });