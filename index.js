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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    //return self.connection.dropDatabase();
  })
   const recipeObject = {
    "title": "Chocolate Chip Cookies",
    "level": "Amateur Chef",
    "ingredients": [
      "1/2 cup light brown sugar",
      "1 large egg",
      "2 tablespoons milk",
      "1 1/4 teaspoons vanilla extract",
      "2 cups semisweet chocolate chips"
    ],
    "cuisine": "French",
    "dishType": "dessert",
    "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4398987.jpg&w=596&h=399.32000000000005&c=sc&poi=face&q=85",
    "duration": 30,
    "creator": "Chef Jennifer"
  };
  Recipe.create(recipeObject)
  .then((recipes) => console.log(`Saved new recipe: ${recipes}`))
  .catch(error => { console.error('Error connecting to the database', error);});
  Recipe.insertMany(data)
  .then((recipes) => console.log(`Saved new recipes: ${recipes}`))
  .catch((saveErr) => console.error(`Save failed: ${saveErr}`)); 
  Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: "100" }, {new: true} )
  .then((recipes) => console.log(`Update is successful: ${recipes}`))
  .catch((saveErr) => console.error(`Update failed: ${saveErr}`));
  Recipe.deleteOne({ title: "Carrot Cake" })
  .then(() => console.log(`Cake is deleted`))
  .catch((saveErr) => console.error(`Delete failed: ${saveErr}`));
  process.on("SIGINT", () => {
    mongoose.connection.close(() => { console.log(`Mongo disconnected`);
      process.exit(0);
    });
  })

  

  
  
