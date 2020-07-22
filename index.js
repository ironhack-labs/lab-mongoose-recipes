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
    const recipe = {
      "title": "Macaroni a mi manera",
      "level": "Amateur Chef",
      "ingredients": [
      "1 kg pasta",
      "5 pieces of bacon",
      "1/3 cup tomato souce"
    ],
      "cuisine": "Italiana",
      "dishType": "breakfast",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 40,
      "creator": "Chef Yop"
    }

    return Recipe.create(recipe);

  })
  
  .then(newRecipe => console.log('La receta se llama:', newRecipe.title))
    // Run your code here, after you have insured that the connection was made
  
  //insertMany
    .then(() => Recipe.insertMany(data))
  
  //update
    .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true }))
    .then(recipe => console.log("The recipe update succesfully!", recipe))

  //delete
    .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
    .then(console.log("This recipe it's no longer aviable."))

  //close DB
    .then(() => mongoose.connection.close())
    .then(console.log("The DB it's disconnected."))
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
