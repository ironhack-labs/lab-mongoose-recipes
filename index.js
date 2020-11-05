const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    console.log(`Clearing database`);
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create(recipeObj)
      .then((result) => console.log(result.title))
      .catch((err) => console.error(err));
    Recipe.insertMany(data)
      .then((results) => {
        results.forEach((result) => {
          console.log(result.title);
        });
        Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then(() => console.log(`Successfully updated Rigatoni!`))
          .catch((err) => console.error(err));
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then(() => console.log(`Successfully removed Carrot Cake!`))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  })
  .then(() => {
    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log("Mongo connection disconnected");
        process.exit(0);
      });
    });
  })
  .catch((error) => console.error("Error connecting to the database", error));

const recipeObj = {
  title: "Hainanese Chicken Rice",
  level: "Amateur Chef",
  ingredients: [
    "Green onions",
    "500g Chicken Breast",
    "Turmeric",
    "Chopped Ginger",
    "Chopped Garlic",
    "Sriracha or sambal",
    "salt to taste",
    "Sesame oil",
  ],
  cuisine: "Asian",
  dishType: "main_course",
  image:
    "https://steamykitchen.com/wp-content/uploads/2017/09/hainanese-chicken-rice-recipe-9681.jpg",
  duration: 40,
  creator: "Chef in Hainan",
};
