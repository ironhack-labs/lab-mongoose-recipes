// DATA
const pasta = {
  title: "Cheese pasta",
  level: "Easy Peasy",
  ingredients: ["pasta", "cheese", "cream"],
  cuisine: "european",
  dishType: "main_course",
  image:
    "https://showmetheyummy.com/wp-content/uploads/2017/12/One-Pot-Ham-and-Cheese-Pasta-Show-Me-the-Yummy-6.jpg",
  duration: 302,
  creator: "tylor",
  date: null,
};

// LOGIC
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
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    // insert one
    const oneRicipe = await Recipe.create(pasta);
    console.log(oneRicipe.title);

    // insert many
    const manyRicipe = await Recipe.insertMany(data);
    manyRicipe.forEach(recipe => console.log(recipe.title));

    // update one
    const renamedRecipe = await Recipe.findOneAndUpdate({title: "Asian Glazed Chicken Thighs"}, {title: "Very good plate"}, { new: true});
    console.log(renamedRecipe.title);
    
    // delete one 
    const deleteRecipe = await Recipe.deleteOne({title: "Sad tartine"});
    deleteRecipe ? console.log('Data has been deleted successfully!') : null;
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .then(() => mongoose.connection.close());
  

  
  