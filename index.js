const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}". Inserting one receipt...`
    );
    const myReceipt = {
      title: "Menorquinamente",
      level: "Amateur Chef",
      ingredients: ["1/2 sobrassada"],
      cuisine: "Mediterranean",
      dishType: "Dish",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 10,
      creator: "Marc Serra"
    };
    return Recipe.create(myReceipt);
  })
  .then(recipe => {
    console.log(`Insert ${recipe.title} ok. Now inserting bulk data...`);
    return Recipe.insertMany(data);
  })
  .then(reciepes => {
    for (let i = 0; i < reciepes.length; i++) {
      const reciepe = reciepes[i];
      console.log(`Inserted ${reciepe.title}`);
    }
    console.log("All inserted done. Now updating bad receipt...");
    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("Updated done. Now removing one receipt...");
    return Recipe.deleteOne({ title: "Carrot Cake" }, err => {});
  })
  .then(() => {
    console.log("Removing done. Now closing the database...");
    return mongoose.connection.close();
  })
  .catch(err => console.error("Error: ", err));
