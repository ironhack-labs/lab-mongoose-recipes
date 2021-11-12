const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const data = require("./data");
const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

async function runCode() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected successfully to the database");
    await Recipe.deleteMany();
    console.log("Database cleared");

    const recipe1 = {
      title: "Beans with palm oil",
      level: "Amateur Chef",
      ingredients: ["Palm oil", "Red Beans", "2 Bananas", "Grilled fish"],
      cuisine: "African",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Dona Teresa",
    };
    const createdRecipe = await Recipe.create(recipe1);
    console.log(`${createdRecipe.title} added to the database`);

    const createdRecipes = await Recipe.insertMany(data);
    console.log(`Database has been populated successfully`);

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    console.log(`Recipe ${updatedRecipe.title} updated successfully`);

    const deletedRecipe = await Recipe.findOneAndDelete({ title: "Carrot Cake" });
    console.log(`Recipe ${deletedRecipe.title} removed successfully`);

    await mongoose.connection.close();
    console.log("connection closed!");
  } catch (error) {
    console.log(error);
  }
}

runCode();
