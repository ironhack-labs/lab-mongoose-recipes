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
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    const missoshiru = Recipe.create({
      title: "Missoshiru",
      level: "Easy Peasy",
      ingredients: [
        "1 tablespoon Missoshiru Paste",
        "1/2L of Water",
        "2 tablespoons of spring onion",
        "200g of Soft Tofu",
      ],
      cuisine: "Japanese",
      dishType: "soup",
      image:
        "https://img.itdg.com.br/tdg/images/recipes/000/037/245/303166/303166_original.jpg?mode=crop&width=710&height=400",
      duration: 10,
      creator: "Tassia Accioly",
      created: 03 - 12 - 2020,
    })
      .then((result) => console.log(("Created Recipe: ", result.title)))
      .catch((err) => console.error(err));

    const newRecipes = Recipe.insertMany(data)
      .then((result) => {
        result.forEach((elem) => console.log(elem.title));

        const update = Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { $set: { duration: 100 } }
        )
          .then((result) => console.log(result))
          .catch((err) => console.error(err));

        const deleteRecipe = Recipe.deleteOne({ title: "Carrot Cake" })
          .then((result) => {
            console.log(result);
            mongoose.connection.close();
          })
          .catch((err) => console.error(err));
      })

      .catch((err) => console.error(err));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
