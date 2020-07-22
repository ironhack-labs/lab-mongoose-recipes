const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


const burger = {
  title: 'Hamburguesas caseras',
  level: 'Easy Peasy',
  ingredients: ['250gr carne picada', '1/2 cebolla picada', '1 chd mostaza', '1chd ketchup', '1 huevo', 'pan rallado', 'sal'],
  cuisine: 'Hommie',
  dishType: 'snack',
  image: 'https://www.pequerecetas.com/wp-content/uploads/2013/10/hamburguesas-caseras.jpg',
  duration: 30,
  creator: 'Who knows!'
};
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })



  .then(() => {
    // Run your code here, after you have insured that the connection was made

    Recipe.create(burger)

      .then(newBurger => console.log(`${newBurger.title}`))

      .then(() => Recipe.insertMany(data))

      .then((dataNew) => {
        dataNew.forEach((recipe) => console.log(`${recipe.title}`));
      })

      .then(() => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true }))

      .then(recipeUpdated => console.log(`${recipeUpdated.title} new duration: ${recipeUpdated.duration}`))

      .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
      .then(recipeDeleted => console.log(`Carrot Cake has been removed`))
      .then(() => {
        console.log('Closing Mongoose');
        mongoose.connection.close();
      })
      .catch(err => {
        console.error('Error in CRUD', err);
      });

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
