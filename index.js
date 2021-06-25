const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


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
  .then(() => {
    Recipe.insertMany(data)
    // Recipe.create({
    //   title: 'something strange',
    //   level: 'Easy Peasy',
    //   ingredients: ['salt', 'water', 'pasta', 'something else'],
    //   cuisine: 'abc',
    //   dishType: 'breakfast',
    //   duration: 12, 
    //   creator: 'Gergö',
    //   image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg"
    //   })


        .then(recipe => {
          recipe.forEach(element => console.log(element.title));
        })
        
        .catch(err => {
          console.log(err)
        })
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  