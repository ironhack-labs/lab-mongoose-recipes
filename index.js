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

    Recipe
      .create({
      title: "Pabellon",
      level: "Amateur Chef",
      ingredients: ["Rice", "Meat", "Platain", "Black beans", "Cylantro", "Egg"],
      cuisine: "Venezuelan food",
      dishType: "main_course",
      image:
        "https://d1kxxrc2vqy8oa.cloudfront.net/wp-content/uploads/2019/09/27092651/RFB-2409-1-pabelloncriollo.jpg",
      duration: 1,
      creator: "Pedro Frias",
    })
      .then((recipe) => console.log(`${recipe.title} recipe added`))
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
