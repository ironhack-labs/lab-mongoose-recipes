const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  let recipe1 = {
    title: 'Asian Glazed',
    level: 'Amateur Chef',
    ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
    cuisine: 'Asian',
    dishType: 'Dish',
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 40,
    creator: 'Chef LePapu'
  }

  //2.
  // Recipe.create( recipe1)
  //   .then( (result) => console.log('Insertion succesful', recipe1.title))
  //   .catch( err => console.log(err));

    // 3.
    // Recipe.insertMany(data)
    //   .then( (result) => console.log('DATA Inserted -> ', data.title))
    //   .catch( err => console.log(err));


    //4.
    const filter =  { title: 'Rigatoni alla Genovese'};
    const update = { duration: 100};

  Recipe.findOneAndUpdate( filter, update, {
      new: true,
  })
  .then( (result) => console.log('Update Succesfull', filter))
  .catch( err => console.log(err));

  //5.
  const filter2 = {title: 'Carrot Cake' }

  Recipe.deleteOne( filter2 )
  .then( (result) => console.log('Delete Succesfull', filter2))
  .catch( err => console.log(err));


  //6. 
  process.on('SIGNIT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected ');
        process.exit(0);
    });
})
