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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({ title: "Chicken curry", cuisine: "india" }).then(
      (recipe) => {
        console.log(recipe.title);
      }
    );
    Recipe.insertMany(data).then((recipes) => {
      recipes.forEach((recipe) => {
        console.log(recipe.title);
      });
      Recipe.findOneAndUpdate({
        title: 'Rigatoni alla Genovese'
      }, {$set:{duration:100}}).catch((error) => {
        console.log(error);
      });
      Recipe.deleteOne({
        title: 'Carrot Cake'
      }).then((recipe) => {
        console.log("great, Carrot Cake is deleted");
        mongoose.connection.close();
      })

    });
   
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
