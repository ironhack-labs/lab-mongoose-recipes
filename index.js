const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(async () => {
    console.log("Connected to Mongo!");
    // Iteration 2 - Create a recipe
    const createResult = await Recipe.create({
      title: "Pastel de chocolate (Prueba 1)",
      level: "UltraPro Chef",
      ingredients: ["1 taza de leche", "1 chocolate"],
      cuisine: "Traditional",
      dishType: "Dessert",
      image:
        "https://d1nsq2txwd94q7.cloudfront.net/public/files/production/recipes/images/4922/thumb/r_4922_1550828876.jpg",
      duration: 30,
      creator: "Willy Wonka",
      created: new Date(2019, 7, 11)
    });
    console.log(createResult.title);

    // Iteration 3 - Insert Many recipes
    const insertManyResult = await Recipe.insertMany(data);
    insertManyResult.forEach(({ title }) => console.log(title));

    // Iteration 4 - Update recipe
    const updateResult = await Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    if (updateResult.ok) {
      console.log("Success updating Rigatoni alla Genovese.");
    }

    // Iteration 5 - Remove a recipe
    const deleteResult = await Recipe.deleteOne({ title: "Carrot Cake" });
    if (deleteResult.ok) {
      console.log("Success deleting Carrot Cake.");
    }

    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
