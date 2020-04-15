const mongoose = require("mongoose");

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
    databaseCycle();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

async function databaseCycle() {
  try {
    await Recipe.create({
      title: "Pâtes au beurre",
      level: "UltraPro Chef",
      ingredients: ["pâtes", "beurre", "eau qui bout un peu mais pas top"],
      cuisine: "Etudiant fauché",
      dishType: "main_course",
      duration: 13,
      creator: "Mr. Pâtes",
    }).then(dbRes => console.log(`The "${dbRes.title}" recipe has been added`))
    await Recipe.insertMany(data).then(dbRes => { dbRes.forEach(e => { console.log(`Recipe title: ${e.title}`) }) })
    await Recipe
      .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
      .then(console.log("The Rigatoni alla Genovese recipe has been updated!"))
    await Recipe.deleteOne({ title: "Carrot Cake" }).then(console.log("The Carrot Cake recipe has been deleted!"))
    await mongoose.connection.close(() => console.log("Database update successful, connection closed"))
  } catch (dbErr) {
    console.log("something went wrong:" + dbErr);
  }
}