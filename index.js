const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose
  .connect(MONGODB_URI)
  .then((mongooseConnect) => {
    console.log(
      `Connected to the database: "${mongooseConnect.connection.name}"`
    );
    return Recipe.deleteMany();
  })

  .then(() => {
    const recipe = new Recipe({
      title: "Kombucha",
      level: "Amateur Chef",
      ingredients: ["Kombucha"],
      cuisine: "Asian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 10000,
      creator: "Chef LePapu",
    });
    // return recipe.save();
    // or
    return Recipe.create(recipe);
  })

  .then((recipe) => {
    console.log(recipe.title);
    return Recipe.findById(recipe._id).select("title -_id");
  })
  .then((title) => {
    // console.log(title);
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.find({}).select("title -_id");
  })
  .then((titles) => {
    titles.forEach((title) => console.log(title.title));
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updated) => {
    console.log(updated);
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" }, { new: true });
  })
  .then((deleted) => {
    console.log("Success deleting", deleted);
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose
      .disconnect()
      .then(() => {
        console.log("Disconnected from the data base");
      })
      .catch((err) => {
        consol.log(err);
      });
  });
