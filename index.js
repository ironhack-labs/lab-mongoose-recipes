const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
const dataRecipes = require('./data.json');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const pizza = {
  title: 'Pizza',
  level: 'Amateur Chef',
  ingredients: ['Tomates', 'Fromage', 'Pâte à pizza'],
  cuisine: 'French',
  dishType: 'main_course'
}

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
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    try {
      const createPizza = await Recipe.create(pizza);
      console.log(createPizza.title);
      await Recipe.insertMany(dataRecipes);
      await Recipe.findOneAndUpdate({title : 'Rigatoni alla Genovese'}, {duration: 100});
      await Recipe.deleteOne({title: 'Carrot Cake'});
      mongoose.connection.close();
    } catch(err) {
      console.log(err);
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
