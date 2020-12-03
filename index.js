const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const newRecipe = {
  title: "Poulet DG",
  level: "UltraPro Chef",
  ingredients: [
    "1 poulet",
    "2 carottes",
    "12 doigts de plantain mûrs",
    "2 oignons",
    "3 tomates",
    "200g de haricots verts",
  ],
  cuisine: "Camerounais",
  dishType: "main_course",
  image:
    "https://www.editions2015.com/cameroun/wp-content/uploads/2015/09/poulet-dg-1.jpg",
  duration: 110,
  creator: "Chef Etouma Esther Bela",
};

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
    //ITERATION 2
    const newData = await Recipe.create(newRecipe);
    console.log("here is the new recipe", newData.title);

    //ITERATION 3
    const insertData = await Recipe.insertMany(data);

    insertData.forEach((oneRecipe) => {
      console.log(oneRecipe.title);
    });

    //ITERATION 4
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );

    await Recipe.deleteOne({ title: "Carrot Cake" });

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
