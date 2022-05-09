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
    // return Recipe.deleteMany();
  })
  .then(async () => {
    try {
      const oneCreate = await Recipe.create({
        title: "YAKISOBA",
        level: "Amateur Chef",
        ingredients: [
          "300 g de macarrão para yakisoba",
          "1 cebola grande picada em pedaços médios",
          "1 colher (sopa) de óleo",
          "1/2 maço pequeno de brócolis",
          "1/2 maço pequeno de couve-flor",
        ],
        cuisine: "Asian",
        dishType: "main_course",
        image:
          "https://amp.receitadevovo.com.br/wp-content/uploads/2020/10/yakissoba.jpg",
        duration: 40,
        creator: "Tudo Gostoso",
      });

      console.log(
        "🚀 ~ file: index.js ~ line 36 ~ .then ~ oneCreate",
        oneCreate.title
      );

      const manyCreate = await Recipe.insertMany(data);
      manyCreate.map((Recipe) => {
        console.log(Recipe.title);
      });

      const updateOne = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true }
      );
      console.log(`Sucess ${updateOne}`);

      const deleteCarrot = await Recipe.deleteOne({ title: "Carrot Cake" });

      console.log(`Delete with sucess ${deleteCarrot.deletedCount}`);
    } catch (err) {
      console.error(err);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
