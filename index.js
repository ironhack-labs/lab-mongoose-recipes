const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Rigatoni alla Genovese",
      level: "Easy Peasy",
      ingredients: [
        "2 pounds red onions, sliced salt to taste",
        "2 (16 ounce) boxes uncooked rigatoni",
        "1 tablespoon chopped fresh marjoram leaves",
        "1 pinch cayenne pepper",
        "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
      duration: 220,
      creator: "Chef Luigi",
      created: Date.now()
    });
  })
  .then((createRecipe) => {
    console.log('Recipe "Rigatoni alla Genovese" created successfully.', createRecipe);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })



  .then(() => {
    Recipe.insertMany(data)
      .then((data) => console.log("insert", data))
      .catch((err) => console.log(err));
  })





Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 210 }, { new: true })
  .then(updatedRecipe => {
    console.log("Updated Recipe:", updatedRecipe);
    console.log("updated");
  })
  .catch(err => console.log(err));





Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(() => {
    console.log("Carrot Cake deleted");
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });