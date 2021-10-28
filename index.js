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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    //-----------------------------    ITERATION 2    -------------------------------
    const myRecipe = new Recipe({
      title: "Homus",
      level: "Easy Peasy",
      ingredients: [
        "300 g de grão-de-bico",
        "caldo de 1 limão",
        "1 dente de alho descascado",
        "100 g de tahine",
        "azeite a gosto",
        "sal e pimenta-do-reino a gosto",
      ],
      cuisine: "Arabe",
      dishType: "main_course",
      image: "https://cdn.panelinha.com.br/receita/994388400000-Homus.jpg",
      duration: 120,
      creator: "Andre",
    });

    const promise1 = Recipe.create(myRecipe)
      .then((recipe) => console.log(`The recipe "${recipe.title}" is saved.`))
      .catch((error) =>
        console.log("An error happened while saving a new recipe:", error)
      );

    //-----------------------------    ITERATION 3    -------------------------------

    const promise2 = Recipe.insertMany(data);

    //-----------------------------    ITERATION 4    -------------------------------
    const promise3 = Promise.all([promise1, promise2])
      .then((result) => {
        result[1].forEach((recipe) => {
          console.log(`The recipe "${recipe.title}" is saved.`);
        });
        Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then(console.log("Recipe updated!"))
          .catch((error) =>
            console.log("An error happened while updating the recipe:", error)
          );
      })
      .catch((err) => console.error(err));

    //-----------------------------    ITERATION 5    -------------------------------

    const promise4 = Promise.all([promise3])
      .then(() => {
        Recipe.deleteOne({ name: "Carrot Cake" })
          .then(console.log("Recipe deleted!"))
          .catch(err => console.log("Recipe NOT deleted: ", err));
      })
      .catch((err) => console.error(err));

    //-----------------------------    ITERATION 6    -------------------------------

    //-------------------------------------------------------------------------------
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
