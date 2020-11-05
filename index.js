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

    // Run your code here, after you have insured that the connection was made
    const greenTea = {
      title: "Green Tea",
      level: "Easy Peasy",
      ingredients: ["green tea leaves", "water"],
      cuisine: "Chinese",
      dishType: "drink",
      duration: 7,
      creator: "ANSummers",
    };

    Recipe.create(greenTea)
      .then((recipe) =>
        console.log("New recipe saved:", recipe.title)
      )
      .catch((error) =>
        console.log("Error while saving new recipe: ", error)
      );

    // Iteration 3
    Recipe.insertMany(data)
      .then((results) => console.log(`Saved new recipes: ${results}`))
      .catch((saveErr) => console.error(`Save failed: ${saveErr}`));
  })

// Iteration 4
Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 } })
  .then(() => console.log(`Duration updated!`))
  .catch(() => console.error('Update Failed'));

// Iteration 5
Recipe.deleteOne({ title: "Carrot Cake" })
  .then(() => console.log(`Carrot Cake successfully removed`))
  .catch((error) =>
    console.log("An error happened while removing recipe", error)
  );
     // Iteration 6
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(`Mongo connection disconnected`);
    process.exit(0);
  })
})