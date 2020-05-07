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
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Lasagna',
      level: 'Easy Peasy',
      ingredients: ['Tomato', 'Meat'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 60,
      creator: 'Fábio'
    });
  })
  .then((recipe) => {
    console.log('Recipe has been created:', recipe.title);

    return Recipe.insertMany(data);
  })
  .then((recipe) => {
    for (recipetitle of recipe) {
      console.log('Recipe has been created:', recipetitle.title);
    }
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then((recipe) => {
    console.log('Updated Duration of Rigatoni alla Genovese');

    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })

  .then((recipe) => {
    console.log('Carrot Cake was Removed!', recipe);
    return mongoose.disconnect();
  })

  .then(() => {
    console.log('Disconnected from MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
