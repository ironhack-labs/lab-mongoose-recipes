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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Lemon Cake",
      level: "Easy Peasy",
      ingredients: ["3 eggs", "1 sachet of baking powder (16 g of baking powder)", "1 lemon yogurt (125 grams)", "flour (3 measures of yogurt)", "sugar (2 measures of yogurt)", "extra virgin olive oil (1 measure of yogurt)", "zest of 1 lemon butter and flour (to spread the mold)", "jam, icing sugar and mint leaves (for garnish)"],
      cuisine: "Spanish",
      dishType: "dessert",
      image: "https://www.hogarmania.com/archivos/201301/489-bizcocho-de-limon-5104-xl-668x400x80xX.jpg",
      duration: 60,
      creator: "Eva Arguiñano",
    })
    .then ((recipe => {
      console.log("Recipe successfully added to DataBase: ", recipe.title)
      return Recipe.insertMany(data);
    }))
    .then ((recipes) => {
      console.log("recipes successfully added to database: ")
      for (let i = 0; i < recipes.length; i++) {
        console.log(recipes[i].title)
      }
      return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {$set: {duration: 100}})
    })
    .then ((fixedRecipe) => {
      console.log("Rigatoni alla Genovese recipe fixed!");
      return Recipe.deleteOne({title: "Carrot Cake"})
    })
    .then(() => {
      console.log("Carrot Cake recipe removed successfully!")
    })
    .catch ((err) => {
      console.log("An error occurred while adding recipe to DataBase: ", err)
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
