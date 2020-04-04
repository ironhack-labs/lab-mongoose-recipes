const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

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
    return self.connection.dropDatabase()
  })
  .then(() => {

    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Borschtsch',
      level: 'UltraPro Chef',
      ingredients: ['beef', 'pork', 'lard', 'beetroots', 'cabbage', 'carrots', 'onions', 'potatoes', 'mushrooms', 'tomato paste', 'parsley, chives', 'dill', 'bay leaves', 'allspice'],
      cuisine: 'Ukrainian',
      dishType: 'soup',
      image: './Borscht-10-Edit.jpg',
      duration: 120,
      creator: 'Olga Knyazkova',
      created: ''
    }).then(e => {
      console.log("we created first item")
    })

    Recipe.insertMany(data).then((recipesFromDatabase) => {
      console.log(recipesFromDatabase)
      // start updating and modifying
      const filter = {
        title: 'Rigatoni alla Genovese'
      }
      const update = {
        duration: 100
      }
      Recipe.findOneAndUpdate(filter, update, {
          new: true
        })
        /*
        (node:54035) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify
        we created first item
        */
        .then(console.log('Successful Update of the Rigatoni alla Genovese!'))


      Recipe.deleteOne({
        title: 'Carrot Cake'
      }).then(console.log('Carrot Cake was deleted successfully!'))
    })
  })
  // Task No 6
  // .then(mongoose.connection.close(() => {
  //   console.log('Mongoose default connection disconnected through app termination')
  // }))
 
  .catch(error => {
    console.error('Error connecting to the database', error);
  })