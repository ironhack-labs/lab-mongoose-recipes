const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error("Error connecting to mongo", err));

Recipe.create({
  title: "cookies",

  level: "Easy Peasy",

  ingredients: [
    "1 cup salted butter",
    "1 cup white sugar",
    "1 cup light brown sugar",
    "2 tsp pure vanilla extract",
    "2 large eggs",
    "3 cups all-purpose flour",
    "1 tsp baking soda",
    "1/2 tsp baking powder",
    "1 tsp sea salt",
    "2 cups chocolate chips (or chunks)"
  ],

  cuisine: "American",

  dishType: "Dessert",

  duration: 30,

  creator: "Joy Food Sunshine"
})
  .then(() => {
    console.log("recipe added");
  })
  .catch(err => {
    console.log("Error :" + err);
  });

Recipe.insertMany(data)
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log("Error: " + err);
  });

Recipe.find({})
  .then(results => {
    const allTitles = results.map(el => el.title);
    /* 
    var allTitles = results.map(function (el) {
      return el.title
    }) */
    console.log(allTitles);
  })
  .catch(err => {
    console.log("Error: " + err);
  });

Recipe.updateOne({ title: "rigatoni alla genovese" }, { duration: 100 }).then(
  () => {
    console.log("Recipe has been updated successfully!");
  }
);

Recipe.deleteOne({ title: "carrot cake" }).then(() => {
  console.log("Recipe has been deleted!");
});

setTimeout(() => {
  mongoose.connection.close();
}, 5000);
