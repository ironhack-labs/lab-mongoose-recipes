const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

async function run() {
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${connection.connection.name}"`);

    await Recipe.deleteMany();

    const insertedRecipes = await Recipe.insertMany(data);
    insertedRecipes.forEach((record) => console.log(record.title));

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
    console.log('Rigatoni alla Genovese updated!', updatedRecipe);

    await Recipe.deleteOne({ title: 'Carrot Cake' });
    console.log('Carrot Cake deleted!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

run();
