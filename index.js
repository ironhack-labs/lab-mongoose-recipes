const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = {
  title: "Orange Juice",
  level: "Amateur Chef", 
  ingredients: ['orange'],
  cuisine: "Spanish"
}

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
    return Recipe.create(newRecipe)
    .then(console.log(`Recipe sucessfully created: ${newRecipe.title}`)) 
  })
  .then(()=> {
    return Recipe.insertMany(data)
    .then(data.forEach(x => console.log("Recipe title:" ,x.title)))
  })
  .then(() => {
    return Recipe.update({'Rigatoni alla Genovese': {duration: 100}})
    .then(console.log('Successfully updated!'))
  })
  .then(() => {
    return Recipe.deleteOne({name: 'Carrot Cake'})
    .then(console.log('Successfully deleted'))
  })
  .then(()=> {
    mongoose.connection.close()
    .then('Successfully closed')
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
