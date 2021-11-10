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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => { 
    Recipe.create({ 
      title: 'tortilla de patatas', 
      level: 'Amateur Chef', 
      ingredients: 'eggs, potato, cheese, bacon, salt', 
      cuisine: 'Spanish', 
      dishType: 'main_course', 
      duration: 40, 
      creator: 'Bárbara', })
    .then((newrecipe) => console.log(newrecipe))

    .then(() => Recipe.create(data))
    .then((eachrecipes => eachrecipes.forEach(elem => console.log(elem))))

    .then(() => Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}), {new: true })
    .then((recipeact => console.log(recipeact)))

    .then(() => Recipe.deleteOne({title:"Carrot Cake"}))
    .then(() => console.log("borré la Carrot-Cake"))

    .then(() => mongoose.connection.close())
    .then(() => console.log("cerré la conexión!"))

    .catch(err => console.error("El error", err))
    // Run your code here, after you have insured that the connection was made
  });
