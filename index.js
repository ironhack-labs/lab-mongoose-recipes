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
    Recipe.create({
      title: "Panzanella",
      level: "Easy Peasy",
      ingredients: [
        "old ciabatta",
        "ripe tomatoes",
        "italian leftover (olives, capers, grilled peppers, red onion",
        " olive oil ",
        "red wine vinegar",
        "fresh basil",
      ],
      cuisine: "italian",
      dishType: "main_course",
      image:
        "https://img.culy.nl/images/TL73zt4UkkY9LfVv26RsbuF3Dk8=/768x271/smart/filters:format(jpeg):quality(80)/https%3A%2F%2Fwww.culy.nl%2Fwp-content%2Fuploads%2F2014%2F07%2FCuly-Stock-00051.jpg",
      duration: 60,
      creator: "Culy",
      created: new Date(),
    });
  })
  .then(() => {
    Recipe.insertMany(data);
    console.log("Recipes have been entered!");
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })

  .then(() => {
    console.log("Remove succesful");
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })

  .catch((error) => {
    return mongoose.disconnect();
    console.error("Error connecting to the database", error);
  })

  .then(() => {
    console.log("Update succesful");
    return mongoose.disconnect();
  });
