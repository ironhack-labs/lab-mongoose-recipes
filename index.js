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
    const sata = {
      title: "Ragout de Ragondin",
      level: "Easy Peasy",
      ingredients: ["Ragondin", "couteau", "Ragout"],
      cuisine: "Spatiale",
      dishType: "main_course",
      image:
        "https://images.unsplash.com/photo-1612156723470-10f426219f63?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      duration: "6",
      creator: "bouba sidibe",
      // created:
    };

    Recipe.create(data)
      .then((cipe) =>
        console.log("The recipe is saved and its title is: ", cipe.title)
      )
      .catch((error) =>
        console.log("An error happened while saving the new recipe:", error)
      );
    // Run your code here, after you have insured that the connection was made

    //iteration 2

    // const rightNow = Recipe.insertMany(data)
    // return rightNow;

    Recipe.insertMany(data)
      .then((many) =>
        many.forEach((toto) =>
          console.log(
            `just added a couple of new recipes, here are their ${toto.title}`
          )
        )
      )
      //super forEachdeluxe, je cree l item many, et pour chaque item many tu vas chercher le titre, je suis pas sur du resultat ??
      .catch((error) => console.log(`go home ${error} you're drunk`));

    //Iteration 3
  });
