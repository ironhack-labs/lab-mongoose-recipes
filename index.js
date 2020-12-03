const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const turkey = {
  title: "Thanksgiving turkey",
  level: "UltraPro Chef",
  ingredients: ["turkey", "3 cans guinness", "10 slices bacon"],
  cuisine: "American",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 240,
  creator: "Chef Elisa",
};

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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async () => {
    const newDBTurkeyObject = await Recipe.create(turkey);
    // console.log(newDBTurkeyObject.title);
  })
  .then(async () => {
    const newRecipes = await Recipe.insertMany(data);
    newRecipes.forEach((recipe) => {
      // console.log(recipe.title);
    });
  })
  .then(async () => {
    const updatedItem = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    console.log(
      `The updated item is: `,
      updatedItem.title,
      updatedItem.duration
    );
  })
  .then(async () => {
    const deleteOne = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log(deleteOne.title, "has been deleted");
  })
  .then(() => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
