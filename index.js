const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model.js');
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
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Japanese Omelette',
      level: 'Easy Peasy',
      ingredients: ['Eggs', 'Mirin', 'Soy Sauce', 'Oil', 'Sugar', 'Dashi'],
      cuisine: 'Japanese',
      dishType: 'breakfast',
      duration: 30,
      creator: 'Minime'
    }).then(() => {
      Recipe.insertMany(data).then((recipesFromDatabase) => {
        console.log(recipesFromDatabase.map((r) => r.title))
      }).then(() => {

        let promise1 = Recipe.findOneAndUpdate({
          title: 'Rigatoni alla Genovese'
        }, {
          duration: 100
        }).then(() => {
          console.log('Receipe Updated!')
        })

        let promise2 = Recipe.findOneAndRemove({
          title: 'Carrot Cake'
        }).then(() => {
          console.log('Sorry, Out of Carrot Cake')
        })

        Promise.all([promise1, promise2]).then(() => {
          mongoose.connection.close()
          console.log('Mongoose database closed!')
        })

      })
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });