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
  .then(async (self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);

    //iteration 2
    const res = await Recipe.create({
      title: "Chicken Vesuvio",
      level: 'Difficult',
      ingredients: ['chicken breast', 'olive oil', 'pepper', 'oregano'],
      cuisine: 'Italian',
      dishType: 'main_course',
      image: 'https://marleyspoon.com/media/recipes/44581/main_photos/large/chicken_vesuvio_parmesan_roasted_potatoes-1f1b0320f7983ae2988a808fe04f1a42.jpeg',
      duration: 25,
      creator: 'Josh Baker'
    })
    console.log(res.title)

    //iteration 3
    const resMany = await Recipe.insertMany(data)
    console.log(resMany)

    //iteration 4
    const updateRecipe = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese' }, {duration: 100})
    console.log(updateRecipe)

    //iteration 5
    const deleteRecipe = await Recipe.deleteOne({title: 'Carrot Cake'})
    console.log(deleteRecipe)

    // const updateLevel = await Recipe.find({level: "Amateur Chef"})
    // console.log(updateLevel)

    mongoose.disconnect()
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });


