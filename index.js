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
    // return self.connection.dropDatabase();
  })
  .then(() => {
    console.log('connected')
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // (async () => {
  //   try {
  //     const recipe = await Recipe.create({
  //       title: "Asian Glazed Chicken Thighs",
  //       level: "Amateur Chef",
  //       ingredients: [
  //         "1/2 cup rice vinegar",
  //         "5 tablespoons honey",
  //         "1/3 cup soy sauce (such as Silver Swan®)",
  //         "1/4 cup Asian (toasted) sesame oil",
  //         "3 tablespoons Asian chili garlic sauce",
  //         "3 tablespoons minced garlic",
  //         "salt to taste",
  //         "8 skinless, boneless chicken thighs"
  //       ],
  //       cuisine: "Asian",
  //       dishType: "main_course",
  //       image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  //       duration: 40,
  //       creator: "Chef LePapu"
  //     });
  //     console.log(recipe.title)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  // )();

  // Iteration 3
  // (async () =>{
  //   const totalRecipes = await Recipe.insertMany(data);
  //   const eachTitleR = totalRecipes.map((eachTitle) => {
  //     console.log(eachTitle.title)
  //   });
  // })();

  // Iteration 4

  // (async () => {
  //   try {
  //     const update = await Recipe.findOneAndUpdate(
  //       { title: 'Rigatoni alla Genovese' },
  //       { duration: 100 },
  //       { new: true }
  //     );
  //     console.log(update);
  //   } catch (error) {
  //   }
  // })();

  //Iteration 5
  (async () => {
    try {
      const deleted = await Recipe.deleteOne({ title: "Carrot Cake" });
      console.log(deleted);
    } catch (error) {
      console.log(error.message);
    }
  })();

  //Iteración 6
  mongoose.connection.close(() => {
  console.log('Mongoose default connection disconnected through app termination');

