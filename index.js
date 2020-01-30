const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
//console.log(Recipe);
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

/* Recipe.create({
  title: "sample",
  level: "Amateur Chef",
  ingredients: ["egg", "water"],
  cuisine: "French",
  dishType: "Breakfast",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 3,
  creator: "John Doe",
  created: new Date()
}); */

//Recipe.insertMany(data);
//console.log(Recipe.title);

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(
  result => {
    console.log("Success!");
  }
);

Recipe.deleteOne({ title: "Carrot Cake" }).then(result => {
  console.log("Success!2");
});

setTimeout(() => {
  console.log("everything is done!");
  mongoose.connection.close();
}, 5000);
