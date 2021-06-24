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
  .then(() => {
    // return Recipe.create({
    //   title: "Apple Cake",
    //   level: "Amateur Chef",
    //   ingredients: [
    //     " 2 apples",
    //     "150g of sugar",
    //     "25g of butter",
    //     "2 drop of Vanilla Sense",
    //     "200g of flour",
    //     "300mL of water",
    //   ],
    //   cuisine: "Argentina",
    //   dishType: "dessert",
    //   image:
    //     "https://t2.rg.ltmcdn.com/es/images/7/3/3/torta_invertida_de_manzanas_56337_600.jpg",
    //   duration: 30,
    //   creator: "Chief Enrique and Chief Anja",
    // });
  })
  .then(() => {
    // return Recipe.insertMany(data);
  })
  .then((result) => {
    //   result.forEach((elem) => {
    //     console.log(elem.title);
    //   });
    //   return Recipe.findOneAndUpdate(
    //     { title: "Rigatoni alla Genovese" },
    //     { duration: 100 }
    //   );
  })
  .then(() => {
    console.log("Recipe duration is updated");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("So sad, the carrot cake is gone");
    mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
