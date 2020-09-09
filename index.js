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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {

   return Recipe.create({
      title: 'Ponquesitos',
      level: 'Easy Peasy',
      ingredients: ['flour', 'eggs', 'chocolate'],
      cuisine: 'Venezuelan',
      dishType: 'dessert',
      duration: 1,
      creator: 'Juan Semprun'
    })

  })
  .then(() => Recipe.create(data))
  .then(() => Recipe.findOneAndUpdate(

      { title: 'Rigatoni alla Genovese' }, 
      { duration: 100 },
      { new: true }
      
    )
  )
  .then(() => console.log('Update Rigatoni alla Genevese: Done'))
  .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
  .then(() => console.log('Delete Carrot Cake: Done'))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  })
})