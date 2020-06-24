const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose.set('useFindAndModify', false); // solve depracated message
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
    // Run your code here, after you have insured that the connection was made
    // console.log(data)
    Recipe
      .create({
        title: 'Fritanga pura',
        level: 'Easy Peasy',
        ingredients: [
          'muuuuushooo aceitito refinado',
          'fueguito',
          'todo lo que quieras meter dentro'
        ],
        cuisine: 'Super Internationl',
      })
      .then(newRecipe => console.log(newRecipe))
      .catch(err => console.log('Error', err))
  })
  .then(() => Recipe.create(data)
    .then(() => data.forEach(elm => console.log(elm.title))))

  .then(() =>
    Recipe
    .findOneAndUpdate({
      title: 'Rigatoni alla Genovese'
    }, {
      duration: 100
    }, {
      new: true
    })
  )
  .then(newDuration => console.log(`New duration is of ${newDuration.title} is `, newDuration.duration))

  .then(() =>
    Recipe
    .deleteOne({
      title: 'Carrot Cake'
    })
  )
  .then(() => console.log('New Item Deleted'))

  .then(() =>
    mongoose.connection.close()
  )

  .catch(error => {
    console.error('Error connecting to the database', error);
  });