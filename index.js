const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { updateOne } = require("./models/Recipe.model");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    labQuestions();
  })
  .catch((error) => console.error("Error connecting to the database", error));

async function labQuestions() {
  await Recipe.deleteMany();
  await addRecipe1();
  await addRecipes();
  await changeRecipe();
  await  removeRecipe();
  await closeDb();
}

async function addRecipe1() {
  try {
    const createNew = await Recipe.create({
      title: "Disgusting Mixture to Feed Middle School Boys at Lunch",
      level: "Easy Peasy",
      ingredients: [
        "Half a drank-from chocolate milk carton (backsplash preferred)",
        "two medium tater tots found on the floor, crushed",
        "2 tbsp pizza sauce from the scraps of someone with a viral illness' pizza slice",
        "water, to fill",
        "spit, to taste",
      ],
      cuisine: "international",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
      duration: 10,
      creator: "Chef Kristen Wegner circa 2006",
    });
    console.log(`${createNew.title}`);
  } catch (err) {
    console.log("Error in iteration one ", err);
  }
}

async function addRecipes() {
  try {
    const importRecipes = await Recipe.insertMany(data);
    console.log(importRecipes[0].title);
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

async function changeRecipe() {
  const filter = { title: "Rigatoni alla Genovese" };
  const update = { duration: 100 };
  const newTrue = { new: true };
  try {
    let foodChange = await Recipe.findOneAndUpdate(filter, update, newTrue);

    console.log("Recipe changed", foodChange);
  } catch (error) {
    console.error("Error connecting to database ", error);
  }
}

async function removeRecipe() {
  try {
    let deletedFood = await Recipe.deleteOne( { title : "Carrot Cake" });
    console.log("Carrot Cake is gone")
  }
  catch (error) {
    console.error('Ya done failed at deleted Carrot Cake')
  }
}

async function closeDb() {
  mongoose.connection.close();
}