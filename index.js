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
  .then(async () => {
    const newRecipe = {
      title: "Bolonhesa bruta",
      level: "Easy Peasy",
      ingredients: ["Macaronne", "Molho", "Cebolão", "Carne moída"],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 20,
      creator: "Henrique Mendes",
    };

    try {
      const createdRecipe = await Recipe.create(newRecipe);
      console.log(`One separate recipe ${createdRecipe.title}`);

      const manyRecipes = await Recipe.insertMany(data);
      console.log("Finished inserting many recipes");
      manyRecipes.forEach(recipe => console.log(recipe.title))

      const updatedRecipe = await Recipe.findOneAndUpdate(
        {title: 'Rigatoni alla Genovese'},
        { $set: {duration: 200}},
        { new: true, useFindAndModify: false}
      )
      
      console.log(`sucessfully update ${updatedRecipe.title} with the time updated ${updatedRecipe.duration}`);

      const deletedRecipe = await Recipe.deleteOne(
        { title: 'Carrot Cake'}
      )
        console.log(deletedRecipe)
        deletedRecipe.n === 1 ? console.log('sucessfully deleted') : console.log('BEEEH, wrong something and nothing was deleted')

      await mongoose.connection.close();
      
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
