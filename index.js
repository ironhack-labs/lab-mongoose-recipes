const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Objects to be inserted:
const newRecipe = {
  title: "Pay de Limón",
  level: "Easy Peasy",
  ingredients: ["Lechera", "galletas", "queso crema"],
  cuisine: "Mexican",
  duration: 25,
};

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
    // Para ligar los then, hay que retornar una promesa...
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
    // https://codeburst.io/need-for-promises-and-rookie-mistakes-to-avoid-when-using-promises-9cabba215e04
    const prom1 = new Promise((resolve, reason) => {
      // Iteration 2: Create a recipe
      Recipe.create(newRecipe, (error1, recipe) => {
        if (error1) {
          reason(`Error: ${error1}`);
        } else {
          resolve(recipe);
        }
      });
    });
    return prom1;
  })
  .then((recipe) => {
    console.log(`Receta creada: ${recipe.title}`);
    // Iteration 3: Create multiple recipes
    const prom2 = new Promise((resolve, reason) => {
      Recipe.insertMany(data, (error2, recipes) => {
        if (error2) {
          reason(`Error: ${error2}`);
        } else {
          resolve(recipes);
        }
      });
    });
    return prom2;
  })
  .then((recipes) => {
    console.log(`Recetas creadas:`);
    recipes.map((recipe) => console.log(`Creada: ${recipe.title}`));
    // Iteration 4: Update Recipes
    const prom3 = new Promise((resolve, reason) => {
      Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { useFindAndModify: false },
        (error3, updating) => {
          if (error3) {
            reason(`Error: ${error3}`);
          } else {
            resolve(updating);
          }
        }
      );
    });
    return prom3;
  })
  .then((updating) => {
    // Searchs for the updated
    Recipe.findById(updating.id, (error6, updated) => {
      if (error6) {
        console.log(`Error: ${error6}`);
      } else {
        console.log(
          `Updated: ${updated.title}  New duration: ${updated.duration}`
        );
      }
    });
    // Iteration 5: Remove a recipe
    const prom4 = new Promise((resolve, reason) => {
      Recipe.deleteOne({ title: "Carrot Cake" }, (error5) => {
        if (error5) {
          reason(`Error: ${error5}`);
        } else {
          resolve("Deleted: Carrot Cake");
        }
      });
    });
    return prom4;
  })
  .then((msgDeleted) => {
    console.log(msgDeleted);
    console.log("Finish");
    // Iteration 6: Close the Database
    mongoose.disconnect();
  })
  .catch((error4) => {
    console.error("Error connecting to the database", error4);
  });
