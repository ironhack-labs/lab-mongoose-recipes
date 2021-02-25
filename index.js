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
    const mousakaRecipe = {
      title: "Mousaka",
      level: "Amateur Chef",
      ingredients: [
        "1/2 kg of meat",
        "2 potatoes",
        "2 courgette",
        "2 eggplants",
        "1 tomato",
        "besamel",
        "3 tablespoons minced garlic",
        "salt to taste",
        "pepper to taste",
        "daphne",
        "olive oil",
        "cheese",
      ],
      cuisine: "Greek",
      dishType: "main_course",
      image: "http/www.hellomousaka.png",
      duration: 80,
      creator: "Chef Amalia",
    };
    //Create a new Recipe
    Recipe.create(mousakaRecipe).then(recipe => console.log(recipe.title))

    .then(() => { 
      Recipe.insertMany(data).then(recipes => console.log(recipes.map(recipe => recipe.title)))

      .then(() => {
        Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true}).then(update => console.log(update))

        .then( () => {
          Recipe.deleteOne({title: "Chocolate Chip Cookies"}).then(result => console.log(result)).catch(err => console.log(err))

          .then(() => {
            mongoose.connection.close()
          })
        })
      })
    })
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
