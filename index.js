const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

//const myData = JSON.parse(data)

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';



// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    returnOriginal: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.syncIndexes()
  })
  .then(() => {
    return Recipe.create({ title: 'Lasagna', level: 'UltraPro Chef', ingredients: ['Tomatoes', 'meat', 'Bechamel'], cuisine: 'Italian', dishType: 'main_course', duration: 4, creator: 'Me' })
  })
  .then(recipe => {
    console.log('El titulo de la receta es: ', recipe.title)
    return Recipe.find()
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(recipes => {
    recipes.forEach(elm => console.log('El titulo de la receta es: ', elm.title))
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  })
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' }, () => console.log("Receta borrada correctamente"))
  })
  .then(() => {
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
