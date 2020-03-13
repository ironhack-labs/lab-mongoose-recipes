const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

const newRecipe = {
  title: "Miojo",
  level: "Easy Peasy",
  ingredients: ["Miojo"],
  cuisine: "Student Life",
  dishType: "Other",
  image: "",
  duration: 3,
  creator: "",
  created: ""
};

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
  .then(
    Recipe.create(new Recipe(newRecipe))
      .then(res => console.log(res.title))
      .catch(error => {
        throw new Error(error);
      }),
    Recipe.insertMany(data)
      .then(res => console.log(res))
      .catch(error => {
        throw new Error(error);
      })
  )
  .then(
    Recipe.find({}).then(res => {
      console.log(res.map(res => res.title));
    }),
    Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then(console.log("Updated!")),

    Recipe.deleteOne({ title: "Carrot Cake" }).then(console.log("Deleted!"))
  )
  .then(mongoose.connection.close())
  .catch(err => console.error("Error connecting to mongo", err));
