const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const data = require("./data.js");
const myReceipt = {
  title: "Menorquinamente",
  level: "Amateur Chef",
  ingredients: ["1/2 sobrassada"],
  cuisine: "Mediterranean",
  dishType: "Dish",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 10,
  creator: "Marc Serra"
};

mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected: "${x.connections[0].name}". Inserting one...`);
    return Recipe.create(myReceipt);
  })
  .then(recipe => {
    console.log(`Inserted ${recipe.title} recepit. Inserting bulk data...`);
    return Recipe.insertMany(data);
  })
  .then(reciepes => {
    reciepes.forEach(r => {
      console.log(`Inserted ${r.title}`);
    });
    console.log(`Inserted bulk. Updating one...`);
    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(res => {
    console.log(`Updated ${res.nModified} docs. Removing one...`);
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(res => {
    console.log(`Removed ${res.deletedCount} docs.`);
  })
  .catch(err => console.error("Error: ", err))
  .finally(() => {
    console.log("Bye");
    mongoose.connection.close();
  });
