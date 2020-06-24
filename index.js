const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost/recipe-app';

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
    // Run your code here, after you have insured that the connection was made
    const recipe = {
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
      creator: "Laura Sanchez"
    }
    return Recipe.create(recipe)
  })
  .then(newRecipe => console.log('La receta se llama:', newRecipe.title))

  .then(() => Recipe.insertMany(data))
  .then(dataRecipes => dataRecipes.forEach(elm => console.log(`${elm.title}`)))
  .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true }))
  .then(recipe => console.log('La receta modificada es', recipe))
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(details => console.log('ya no esta:', details))
  .then(() => mongoose.connection.close())



  .catch(error => {
    console.error('Error connecting to the database', error);



  });
