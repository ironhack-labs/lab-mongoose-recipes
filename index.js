const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { Model } = require('mongoose');

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
    // return self.connection.dropDatabase();
  })
  .then(() => {
    // Recipe.create({
    //   title: "Asian Glazed Chicken Thighs",
    //   level: "Amateur Chef",
    //   ingredients: [
    //       "1/2 cup rice vinegar",
    //       "5 tablespoons honey",
    //       "1/3 cup soy sauce (such as Silver Swan®)",
    //       "1/4 cup Asian (toasted) sesame oil",
    //       "3 tablespoons Asian chili garlic sauce",
    //       "3 tablespoons minced garlic",
    //       "salt to taste",
    //       "8 skinless, boneless chicken thighs"],
    //   cuisine: "Asian",
    //   dishType: "main_course",
    //   image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    //   duration: 40,
    //   creator: "Chef LePapu"
    // })
    // .then((title) => {
    //   console.log(title)
    // })


    // Recipe.insertMany(data)
    // .then(res => {
    // console.log('Recipes inserted successfully')
    // })

    // Recipe.updateOne({duration: 220}, {duration: 100})
    //   .then(res => {
    //     console.log(res)
    //     console.log('Rigatoni duration updated successfully')
    //   })

    Recipe.deleteOne({title: 'Carrot Cake'})
      .then(res => {
        console.log(res)
        console.log('Carrot Cake deleted successfully')
      })
  })
  .catch(error => {
      console.error('Error connecting to the database', error);
  })

  
  