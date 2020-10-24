const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const firstRecipe = {
  title: 'Pasta Carbonara',
  level: 'Amateur Chef',
  ingredients: ['Eggs', 'Cream', 'Pasta'],
  cuisine: 'Italian',
  dishType: 'main_course',
  image: 'https://images.media-allrecipes.com/images/75131.jpg',
  duration: 30,
  creator: 'Alicja'
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
  .then(() => {
    // Recipe.create(firstRecipe);
    // console.log(firstRecipe.title);
    return Recipe.insertMany(data);

    /*for (let i = 0; i < data.length; i++) {
      console.log(data[i].title)
    }
    */

  }).then(() => {

    return Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  }).then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  }).then(() => {
    mongoose.disconnect()
    console.log('success')
  })
