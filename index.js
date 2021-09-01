const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { create } = require('./models/Recipe.model');

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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())

  .then(() => {

  // Iteracion 1
  Recipe
    .create({title: 'Meat Pie', level: 'Amateur Chef', ingredients: ['Potatoes', 'Tomato Sauce', 'Meat', 'Olive oil'], cuisine: 'American', dishType: 'main_course', image: 'https://canalcocina.es/medias/publicuploads/2017/03/05/162735/148002322958bb486de934f9.48228749.jpg', duration: 60, creator: 'Chef Daniel'})
    .then(console.log("ok"))
    .then(addedOwnRecipe => {
      console.log("Added own recipe", addedOwnRecipe.title);
      return Recipe.create(data)
    })
    .then (addedData => {
      addedData.map((data) => console.log("Added", data.title))
      return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
    })
    .then(updatedData => {
      console.log("Updated data");
      return Recipe.deleteOne({title: 'Carrot Cake'})
    })
    .then(deletedRecipe => {
      console.log("Deleted entry")
      return mongoose.disconnect();
    })
    .catch(err => console.log('Error detected ---', err))
  })

