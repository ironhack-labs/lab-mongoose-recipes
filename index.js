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
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
  Recipe.deleteMany({}).then(e => {
    Recipe.create({
      title: 'Copy-Asian Glazed Chicken Thighs',
      level: 'Amateur Chef',
      ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
      cuisine: 'Asian',
      dishType: 'Dish',
      image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
      duration: 40,
      creator: 'Chef LePapu'
    }).then(data => console.log('The data is saved and its value is: ', data.title))
    .catch( err=>  console.log('An error happened:', err))
    

  const promise1 = Recipe.insertMany(data)
  const promise2 = Recipe.update({title:'Rigatoni alla Genovese'},{duration:100})
  const promise3 = Recipe.deleteOne({title: 'Carrot Cake'})

  Promise.all([promise1, promise2,promise3]).then(data=>{
    console.log('The data is saved and its value is: ', data)
    mongoose.connection.close();
  }).catch( err=>  console.log('An error happened:', err))

  })
  




