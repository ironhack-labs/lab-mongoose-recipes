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
  .then((result) => {
    //  Recipe.create({

    // title: "Carrot Cake",
    // level: "Amateur Chef",
    // ingredients: [
    //   "6 cups grated carrots",
    //   "1 cup brown sugar",
    //   "1 cup raisins",
    //   "4 eggs",
    //   "1 1/2 cups white sugar",
    //   "1 cup vegetable oil",
    //   "2 teaspoons vanilla extract",
    //   "1 cup crushed pineapple, drained",
    //   "3 cups all-purpose flour",
    //   "1 1/2 teaspoons baking soda",
    //   "1 teaspoon salt",
    //   "4 teaspoons ground cinnamon"
    // ],
    // cuisine: "International",
    // dishType: "dessert",
    // image: "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
    // duration: 130,
    // creator: "Chef Nadia"
    //  });
    Recipe.insertMany(data)

  })

  .then((result)=>{
    // console.log(result.title)
    result.forEach((recipe)=>{console.log(recipe.title)})

    })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
