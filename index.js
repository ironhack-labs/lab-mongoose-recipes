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
    //const recipe = mongoose.model("recipe", recipeSchema);
    
    const pasta = {
      title: "macarroni",
      level: "Easy Peasy",
      ingredients: "pasta",
      cuisine: "ni idea",
      dishType: "main_course",
      duration: 50,
      creator: "benito",
    }
    
    return Recipe.create(pasta)
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  