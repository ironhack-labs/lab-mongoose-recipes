const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Recipe.create({
    //   title: 'Pozole',
    //   level: 'Easy Peasy',
    //   ingredients: ['Pork', 'corn', 'lettuce', 'chilli powder', 'radish', 'oregano', 'pork broth'],
    //   cuisine: 'mexican',
    //   dishType: 'main_course',
    //   duration: 120,
    //   creator: 'Moctezuma',
    // }).then((r) => console.log(r)).catch((err) => console.log(err));
// 
    // Recipe.insertMany(data).then(res => console.log(res)).catch(err => console.log(err));

    Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
          .then(res => {
            console.log(res)
          })
          .catch(err => console.log(err))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

