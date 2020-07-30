const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose.connect(MONGODB_URI, {
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
    Recipe.create({
    title: 'Potatoes omelette', 
    level: 'Easy Peasy',
    ingredients:  ['potatoes, eggs, onion, olive oil'],
    cuisine: 'Spanish',
    dishType: 'main_course',
    duration:  30,
    creator: 'Britta & Galicia'
    })

    .then((result) => {
      console.log(result.title)
    })
    .catch((error) => {
      console.log(error)
    })
    
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  .then(() => {
    Recipe.insertMany(data)  
      .then((result) => {
      console.log(result)
      })
      .catch((error) => {
      console.log(error)
    })
    .then(() => {
      Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {$set: {duration: 100} })
      .then(() => {
        console.log('Hooray! You have updated successfully your recipe!')
      })
      .catch((error) => {
        console.log('Sorry, the recipe remains untouched. A chef never changes his recipes!')
      })
    })
    .catch(error => {
      console.error('Error connecting to the database', error);
    })
    .then(() => {
      Recipe.findOneAndDelete({title: 'Carrot Cake'})
      .then(() => {
        console.log('Hooray! You have deleted successfully your recipe!')
      })
      .catch((error) => {
        console.log('Sorry, the recipe remains untouched. A chef never deletes his recipes!')
      })
    })
    .catch(error => {
      console.error('Error connecting to the database', error);
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

MONGODB_URI.disconnect();