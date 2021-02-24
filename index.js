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
  
  function recipeCreate(infos) {
    const {
      title,
      level,
      ingredients,
      cuisine,
      dishType,
      image,
      duration,
      creator,
      created,
    } = infos;
    Recipe.create({
      title,
      level,
      ingredients,
      cuisine,
      dishType,
      image,
      duration,
      creator,
      created,
    })
  
  .then((dbSuccess) => {
    // Run your code here, after you have insured that the connection was made
    console.log(dbSuccess)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })};


  recipeCreate({
    title: "Ceviche",
    level: "Amateur Chef",
    ingredients: ["tomato", "oignon", "shrimp", "orange juice", "lemon"],
    cuisine: "ecuadorian",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 45,
    creator: "Chef Juan",
    created: Date.now()
  })


  // Recipe.insertMany(data).then(docs => docs).catch(error=>error)