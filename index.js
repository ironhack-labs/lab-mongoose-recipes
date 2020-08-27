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
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made


    return Recipe.create(firstRecipe)
    .then(firstRecipe => console.log(`${firstRecipe.title}`))
    .catch(error => console.log('An error happened while saving a first new recipe', error));
  })
  .then(() => {
    return Recipe.insertMany(data)
      .then(data => {
        for( let i = 0; i < data.length; i++) {
          console.log(`${data[i].title}`)
        }
      })
      .catch(error => console.log('An error happened while saving a all the new recipe', error));
  })
  .then(()=> {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, { duration : 100})
      .then(()=> console.log('The update was a succes'))
      .catch(error => console.log('An error happened while updating', error))
  })
  .then(()=> {
    return Recipe.deleteOne({title: 'Carrot Cake'})
      .then(() => console.log('The Carrot Cake recipe was succesfully deleted'))
      .catch(error => console.log('An error happened while deleting', error))
  })
  .then(()=> {
    mongoose.connection.close()
      .then(()=> {
        console.log('Yes, closed')
      })
      .catch(err => {
        console.log(err)
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  const firstRecipe = {
    "title": "Asian Glazed Chicken Thighs",
    "level": "Amateur Chef",
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


  