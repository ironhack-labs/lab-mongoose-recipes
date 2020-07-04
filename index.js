const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const chilliConCarne ={
  title: 'Chili con carne', 
  level: 'Easy Peasy',
  ingredients: [ 'Meat', 'Chili', 'Beans', 'Vegetables', 'Tomato' ],
  cuisine: 'mexican',
  dishType: 'main_course',
  duration: 40,
  creator: 'Maria'}

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
    Recipe.create(chilliConCarne)
    .then((chilliConCarne) => console.log(chilliConCarne.title))
    .then(() => Recipe.insertMany(data))
    .then(() => data.forEach(recipe => {console.log(recipe.title)}))
    .then (() => Recipe.updateOne({ title : 'Rigatoni alla Genovese' }, { duration : 100 }, { new: true }))
    .then((recipe) => console.log(`The ${recipe.title} duration was fixed. Its duration now is ${recipe.duration}`))
    .then(() => Recipe.deleteOne({ title: 'Carrot Cake'}))
    .then(() => console.log(`You just deleted the Carrot Cake!`))
    .then(()=> {
      console.log('Your recipes database is now closed')
      mongoose.connection.close()
      process.exit(0)
    })

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
