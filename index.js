const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { insertMany } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

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
    return Recipe.create({
      title: 'Papas',

      level: 'Easy Peasy',

      ingredients: ['oil', 'carrot'],

      cuisine: 'Spain',

      dishType: 'breakfast',

      image: "https://images.media-allrecipes.com/images/75131.jpg",



      duration: 10,

      creator: 'Sergio'

    })
  })
  .then(recipe => console.log(`${recipe.tilte}`))
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(data => data.forEach(elm => console.log(`The name of the recipe is: ${elm.title}`)))

  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  })
  .then(recipe => console.log(`the duration of the updated recipe is ${recipe.duration}`))

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('mongoose has been disconnected');
    process.exit(0);
  });
});


