const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    /*
    Recipe.create({
      title:'Recipe one',
      level:'Easy Peasy',
      ingredients:['cebolla', 'pimiento', 'sal'],
      cuisine:'cuisine',
      dishType:'soup',
      duration:45,
      creator:'jo huerta',    
    })
    
    .then(recipe => {
        console.log(`Cretate new recipe: ${recipe}`)
        })
    .catch(err => console.log( 'Error===>',err))
     */
    
    Recipe.insertMany(data)
      .then((data) => console.log(`Insert ${data}`))

      .then(() => {
        Recipe.updateOne(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        )
          .then((res) => console.log("Update Success!!"))
          .catch((err) => console.log(err));
      })

      .then(() => {
        Recipe.deleteOne({ title: "Cake" })
          .then((res) => console.log("Delete!"))
          .catch((err) => console.log(err));
      })

      .then(() => {
        Recipe.find({}, { title: 1 })
          .then((recipes) =>
            recipes.forEach((recipe) => console.log(recipe.title))
          )
          .catch((err) => console.log(err));
      })

      // Iteration 6 - Close the Database
      .then(() => mongoose.connection.close())
      .catch((err) => console.log(err));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
