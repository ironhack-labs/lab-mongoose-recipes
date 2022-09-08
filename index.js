const mongoose = require("mongoose");
const fs = require("fs");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const recipesData = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf-8'));

// async function startLab() {
//   await mongoose.connect(MONGODB_URI);
//   await mongoose.connection.db.dropDatabase();
//   await mongoose.connection.close();
// }

// startLab();

const recipe1 = new Recipe({
  title: "R1",
  level: "Easy Peasy",
  // enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  // ,ingredients:
  cuisine: "Spanish",
  dishType: "other",
  // enum: ["breakfast","main_course","soup","snack","drink","dessert","other",],
  // ,image:
  // ,duration:
  // ,creator:
  // ,created:
});

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

mongoose
  .connect(MONGODB_URI)
  .then(async (x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Run your code here, after you have insured that the connection was made
    await recipe1.save();
    await Recipe.insertMany(recipesData);
    const allRecipes = await Recipe.find({},{_id:0,title:1});
    console.log(allRecipes);
    await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' },{duration: 100},{ runValidators: true }).then(()=>{console.log("Updated!")});
    await Recipe.deleteOne({ title: 'Carrot Cake' }).then(()=>{console.log("Deleted!")});
    const allRecipes2 = await Recipe.find({},{_id:0,title:1});
    console.log(allRecipes2);
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
