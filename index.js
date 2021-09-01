const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

/*
1. Reciben como parametro el retorno del anterior
2. Te garantizan la espera del ultimo return
*/

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
  .then(() => Recipe.syncIndexes())
  .then(() => {
    return Recipe.create(
      data.concat([
        {
          title: "Peanut Sandwich",
          level: "Easy Peasy",
          ingredients: ["bread", "peanut butter"],
          cuisine: "Cuisine",
          dishType: "breakfast",
          image: "",
          duration: 1,
          creator: "Jesus",
          created: "2021-09-01",
        },
      ])
    ).then((recipes) => {
      //recipes.forEach((elm) => console.log(`title:${elm.title}`));
      Recipe.updateOne(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      ).then((newRecipe) => {
        Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
          mongoose.connection.close();
        });
      });
    });
  }) //AQUI??????

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

/*
  mongoose.connection()
  .then(()=> {
    console.log("todo fue bien")
    return Recipe.create()
  })
  .then((recipesCreated)=>)
  .then(()=>)
  .then(()=>)
  .then(()=>)
  .then(()=>)
  .catch(err=>{})
  */
