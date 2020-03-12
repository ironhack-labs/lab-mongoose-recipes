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
  title: "Scrambled eggs",
  level: "Easy Peasy",
  ingredients: ["eggs", "milk", "salt", "pepper"],
  cuisine: "American",
  dishType: "Breakfast",
  image_url: "https://pngio.com/images/png-a654916.html",
  duration: "20",
  creator: "Chef Elena"
})
  .then(recipe => {
    console.log("title:", recipe);
  })
  .catch(err => {
    console.log("Error:", err);
  });

Recipe.insertMany(data).then(data => {
  for (let i = 0; i < data.length; i++) {
    console.log("title:", data[i].title);
  }
});

Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: "100" }
).then(recipe => {
  console.log("Whoop Whoop!!!");
});

Recipe.deleteOne({ title: "Carrot Cake" })
.then(recipe => {
  console.log("Recipe Deleted!");
  mongoose.connection.close();
});


