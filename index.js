const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const spanishOmelette = {
  title: "Spanish Omelette",
  level: "Easy Peasy",
  ingredients: [
    " 4 eggs",
    " 1 onion",
    "1/2 kg potatoes",
    " 2 cups of virgin oil",
    "salt",
    "200gr goat cheesse",
    "100gr green pepper",
  ],
  cuisine: "Spanish",
  dishType: "breakfast",
  image:
    "https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2019/05/tortilla-espa%C3%B1ola.jpg",
  duration: 30,
  creator: "Paco",
};
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create(spanishOmelette)
      .then((newRecipe) =>
        console.log(
          `The title of the recipe is ${spanishOmelette.title}`,
          newRecipe
        )
      )
      .catch((error) => {
        console.error("Error creating recipe", error);
      });
  })
  .then(() => {
    Recipe.insertMany(data)
      .then((result) =>
        result.forEach((recipe) => {
          console.log(recipe);
        })
      )
      .catch((err) => console.error("Error insertMant¡y", err));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 },
  { new: true }
)
  .then((recipe) => console.log(recipe.duration))
  .catch((err) => console.log(err));

Recipe.deleteOne({ title: "Carrot Cake" })
  .then((recipe) => console.log(recipe.title))
  .catch((err) => console.log(err));

/*  (async ()=>{
    const db = await mongoose.connect(MONGODB_URI, { useMongoClient: 
                  true })

    
    db.disconnect()
}) */
