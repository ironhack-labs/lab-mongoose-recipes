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
    // Run your code here, after you have insured that the connection was made
    const recipe = {
      title: 'ApplePie',
      level: 'Easy Peasy',
      ingredients: ['Apple', 'Pie'],
      cuisine: 'American',
      dishType: 'dessert',
      image: 'https://static.backen-mit-spass.de/images/content/369/01.jpg',
      duration: 40,
      creator: 'Chef',
      // created:      { type: Date, default: Date.now },
    };

    Recipe.create(recipe).then(() => {
      // console.log(recipe.title)
    });
    Recipe.insertMany(data).then((arrayOfCreatedRecipe) => {
      arrayOfCreatedRecipe.forEach(el => {
        console.log(el.title)
      });

      Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true }).then((e) => {
        // console.log('sucess', e)
      })
      Recipe.findOneAndRemove({ title: 'Carrot Cake' }).then((e) => {
        console.log('removed', e)
      }).catch(err => {
        console.log(err)
        mongoose.disconnect()
      });

    });

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
