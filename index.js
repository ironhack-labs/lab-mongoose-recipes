const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const rcp = {
  "title": "Thai Glazed Chicken Thighs",
  "level": "Beginner",
  "ingredients": [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "3 tablespoons minced garlic",
    "salt to taste",
    "8 skinless, boneless chicken thighs"
  ],
  "cuisine": "Asian",
  "dishType": "main_course",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  "duration": 40,
  "creator": "Chef LePapu"
}


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    // Iteration 2 - Create a recipe
    const saved = await Recipe.create(rcp);
    console.log(saved.title);
  })
  .then(async () => {
    // Iteration 3 - Insert multiple recipes
    const savedMany = await Recipe.create(data);
    savedMany.forEach((arr) => {
      console.log(arr.title)
    })
  })

  .then(async () => {
    // Iteration 4 - Update recipe
    const updatedOne = await Recipe.findOneAndUpdate({
      title: 'Rigatoni alla Genovese'
    }, {
      duration: 100
    }, {
      new: true
    });

    console.log("the following recepe has been successfully updated", updatedOne.title, updatedOne.duration);
  })

  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    // Iteration 5 - Remove a recipe
    const deletedOne = await Recipe.deleteOne({
      title: 'Carrot Cake'
    });
    console.log("The deleted one is", deletedOne);
  })

  // .then(() => mongoose.connection.close(function () {
  //// Iteration 6 - Close the Database
  //   console.log('Mongoose connection disconnected');
  // }))

  .catch(error => {
    console.error('Error connecting to the database', error);
  });