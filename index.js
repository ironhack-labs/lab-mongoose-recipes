const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model.js");
// Import of the data from './data.json'
const data = require("./data.json");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    const beurreDeCacahuete = await Recipe.create({
      title: "Beurre de cacahuètes",
      level: "Amateur Chef",
      ingredients: [
        "cacahuète grillée non salées",
        "huile de tournesol",
        "une pincée de sel",
        "uen cuillère à soupe de sucre",
        "une gousse de vanille",
      ],
      cuisine: "un mixeur et une balance de cuisine",
      dishType: "dessert",
      image:
        "https://assets.afcdn.com/recipe/20130819/46720_w1200h1636c1cx1872cy2552.webp",
      duration: 15,
    });
    console.log(beurreDeCacahuete.title);
    const multipleNewRecipes = await Recipe.insertMany(data);
    multipleNewRecipes.forEach(element => console.log(element.title));
    await Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration :100}).catch(() => console.log('problem'));
    console.log('Updated successfully')
    await Recipe.deleteOne({title: 'Carrot Cake'}).catch(() => console.log('PB => CC still in DB'))
    console.log('Carrot Cake successfully delete from DB');

    await mongoose.connection.close()
  })
  

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
