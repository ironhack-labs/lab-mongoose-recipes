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
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // console.log(data)
  })
  .then(() => Recipe.create(
    {
      title: "Rice and Chicken",
      level: "Amateur Chef",
      ingredients: [
        "2 pounds red onions, sliced salt to taste",
        "2 (16 ounce) boxes uncooked rigatoni",
        "1 tablespoon chopped fresh marjoram leaves",
        "1 pinch cayenne pepper",
        "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
      ],
      cuisine: "Peruvian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
      duration: 120,
      creator: "Chef Luigi"
    }
  ))
  .then(() => Recipe.create(data))
  .then(() => Recipe.updateOne({ duration: 220 }, { duration: 100 }, { new: true }))
  .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
  .then(() => {
    console.log("Connection closed")
    mongoose.connection.close()
  }
  )
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
