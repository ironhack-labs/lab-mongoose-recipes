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
    return Recipe.create({
      "title": "Bite size donuts (AKA Donut Holes)",
      "level": "Amateur Chef",
      "ingredients": ["1 1/4 cups (176g) all-purpose flour (scoop and level to measure)",
        "2 tsp baking powder",
        "1/4 tsp salt",
        "1/2 cup (120 ml) buttermilk",
        "1/4 cup (50g) granulated sugar",
        "3 Tbsp (42g) melted butter",
        "3 - 4 cups vegetable oil, for frying"
        ],
      "cuisine": "American",
      "dishType": "breakfast",
      "image": "https://www.cookingclassy.com/wp-content/uploads/2020/05/15-minute-donuts-03-600x900.jpg",
      "duration": 20,
      "creator": "Jaclyn from cookingclassy.com"
      // "created": "Default" preciso colocar isso aqui ou ele ja vai direto?
    })
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
