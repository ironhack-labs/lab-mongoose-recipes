const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  Recipe.create({
  title : "Pasta with sauce",
  level: "Easy Peasy",
  ingredients: ["pasta", "tomatoes", "oignons", "basilic"],
  cuisine: "Europe",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 15,
  creator: "Italians",
  created: 24-02-2021,
  },)

  // Recipe.find()
  // .then(recipesfromDB => {
  //   recipesfromDB.forEach((oneRecipe) => {
  //     console.log(`recipe : ${oneRecipe.title}`);
  //   })
  // })
  // .catch(error => console.log(`Error occured during getting recipes from DB : ${error}`));


  Recipe.insertMany(data)
  .then(recipesfromDB => {
     recipesfromDB.forEach((oneRecipe) => {
      console.log(`recipe : ${oneRecipe.title}`);
    })
  })
  .catch(error => console.log(`Error occured during adding recipes to DB : ${error}`));

  Recipe.findOneAndUpdate({title : "Rigatoni alla Genovese"}, {duration : 100} )
  .then (success => console.log("yeay!"))
  .catch(error => console.log("Error"))

  Recipe.deleteOne({title : "Carrot Cake"})
  .then (success => {console.log("Not on the menu anymore...");
  mongoose.connection.close();
  })
  .catch(error => console.log("Error2"))

