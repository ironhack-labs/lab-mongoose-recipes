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
 /*  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  }) */
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  /*   const mydata = {
      "title": "Asian Chicken",
      "level": "Amateur Chef",
      "ingredients": [
        "1/2 cup rice vinegar",
        "1/3 cup soy sauce",
        "3 tablespoons minced garlic",
        "salt to taste"
      ],
      "cuisine": "Asian",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 40,
      "creator": "Chef LePapu"
    }

    Recipe.create(mydata)
    .then(recipe => console.log('The recipe title is: ', recipe.title))
    .catch(error => console.log('An error happened while saving a new user:', error));
 */
    Recipe.insertMany(data)
      .then(recipes => {
      recipes.forEach(recipe => {
        console.log('The recipe title is: ', recipe.title)
      });
    })
    .catch(error => console.log('An error happened while saving a new user:', error));
 
    Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      .then(data => console.log('Rigatoni alla Genovese was successfully updated!'))
      .catch(err => console.log(err))

    Recipe.deleteOne({ title: 'Carrot Cake' })
      .then(data => console.log('Carrot cake was deleted successfully!'))
      .catch(err => console.log('Oh, no! The document could not be deleted! The error: ', err))

  })
  //AQUI
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });





