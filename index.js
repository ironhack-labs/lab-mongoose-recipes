const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"

//Guillaume a corrigé le lab de Rico et j'avais fait la même chose des then dans tous les sens mais je ne les avais pas emboîté. Donc je t'ai laissé ce code en comment à la fin, donc aucun mérite mais j'ai compris dans l'ensemble.
(async function () {
  const self = await mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    console.log(`Connected to the database: "${self.connection.name}"`);
    self.connection.dropDatabase();

    const createRecipe = await Recipe.create(data[0]);
    console.log(createRecipe.title);

    const insertRecipe = await Recipe.insertMany(data);
    insertRecipe.forEach((res) => console.log(">", res.title));

    const updateRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );

    const deleteRecipe = await Recipe.deleteOne({
      title: "Carrot Cake",
    });
  } catch (err) {
    console.log(err);
  }
  self.connection.close(() => {
    console.log("disconnect");
  });
})();

// .then((self) => {
//   console.log(`Connected to the database: "${self.connection.name}"`);
//   // Before adding any documents to the database, let's delete all previous entries
//   return self.connection.dropDatabase();
// })
// .then(() => {
//   // Run your code here, after you have insured that the connection was made
//   Recipe.create({
//     title: "Fake recipe",
//     level: "Amateur Chef",
//     ingredients: ["1/2 cup petrol", "5 tablespoons spider"],
//     cuisine: "Unknow",
//   })
//     .then((res) => {
//       console.log(res.title);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   Recipe.insertMany(data)
//     .then((res) => {
//       for (const res in data) {
//         console.log(res.title);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese",}, {duration: 100},{new: true})
//   .then((res)=> {console.log(res.duration)})
//   .catch ((error)=> {console.log(error)})
// })

// .catch((error) => {
//   console.error("Error connecting to the database", error);
// });
