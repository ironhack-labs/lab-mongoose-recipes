const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const RecipeModel = require("./models/Recipe.model");
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
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = await RecipeModel.create({
      title: "Nega Maluca",
      level: "Amateur Chef",
      ingredients: ["Flour", "Yeast", "eggs", "butter", "chocolate", "milk"],
      cuisine: "Brazilian",
      dishType: "dessert",
      image:
        "https://s2.glbimg.com/m0UshVpIim8CLr0DgcNJr6tIIZA=/0x0:1900x1400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/E/N/ddsVUiRXCXki9nIpIWAg/bolo-de-chocolate.jpg",
      duration: 60,
      creator: "TatiMatz",
      created: Date.now(),
    });

    console.log(newRecipe, newRecipe.title);
  })
  .then(async () => {
  
    const newRecipes = await RecipeModel.insertMany(data);
    console.log(newRecipes.title);
  })

  .then(async () => {
  
    const updatedRigatoni = await RecipeModel.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {duration: 100},
      {new: true}
    );
    console.log(updatedRigatoni);
    console.log("Rigatoni checked!")
  })

  .then(async () => {
  
    const deleteCarrotCake = await RecipeModel.deleteOne(
      {title: "Carrot Cake"},
    );
    console.log(deleteCarrotCake);
    console.log("Carrot Cake no longer available")

    mongoose.connection.close();
  })
  
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
