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
    return Recipe.deleteMany()
  })
  .then( async () => {

    await Recipe.create({
      title: 'Ovo mexido',
      level: 'Easy Peasy',
      ingredients: ['eggs', 'pepper', 'salt', 'oil'],
      cuisine: 'American',
      dishType: 'breakfast',
      duration: 20,
      creator: 'Lucas',
    }).then(recipe => console.log('This recipe was saved as:', recipe.title))
    .catch(error => console.log('Was not able to save recipe. Error:', error))
  })
  .then( async () => {
    await Recipe.insertMany(data)
    .then(data => data.forEach(recipe => console.log('This recipe was added:' + recipe.title)))
    .catch(error => console.log('Was not able to add recipe due to:',  error))
  })
  .then( async () => {
    const filter = {title: 'Rigatoni alla Genovese'}
    const result = await Recipe.findOneAndUpdate(filter, {$set: {duration: 100}})
    return console.log('This recipe was successfully updated:', result.title)
    
  }).catch(error => console.log('Unable to updated due to:', error))

  .then( async () => {
    const removeOne = await Recipe.deleteOne({title: 'Carrot Cake'})

    return console.log('This recipe was deleted:', removeOne.title)

  }).catch(error => console.log('Unable to delete due to:', error))

  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally( async () => 
    await mongoose.disconnect(MONGODB_URI)
    .then(console.log('Disconnected from DB'))
    .catch(error => console.log('Error while disconnecting from DB: ', error))
  )

