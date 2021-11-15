const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipe1 = {
      title: "Focaccia",
      level: "Amateur Chef",
      ingredients: [
        "5g dry biologicalk yeast",
        "1 tablespoon sugar",
        "400ml lukewrm water",
        "1/4 cup Asian (toasted) sesame oil",
        "1 tablespoon olive oil",
        "1 teaspoon salt",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Clara Vasconcelos",
    };
    return Recipe.create(recipe1);
  })
  .then((createdRecipe) => {
    return Recipe.insertMany(data) // prettier-ignore
  })
  .then((createdRecipiesArr) => {
    createdRecipiesArr.forEach((eachRecipe) => {
      console.log(eachRecipe.title);
    });
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true } //to return the updated version of the document
    );
  })
  .then((updatedRecipe) => {
    console.log(`updatedRecipe`, updatedRecipe.title);
    return Recipe.deleteOne({ name: "Carrot Cake" });
  })
  .then((deleted) => {
    console.log(`deleted`, deleted);
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("connection closed!");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
