const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .set('strictQuery', true)
  .connect(MONGODB_URI)
  .then(db => {
    console.log(`Connected to the database: "${db.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Gazpacho",
    level: "Easy Peasy",
    ingredients: [
      "1 onion",
      "6 tomatoes",
      "1 cucumber",
      "1/2 garlic ",
      "100 g of farmhouse bread",
      " 4 tbsp of extra pure olive oil",
      "1 teaspoon dried oregano",
      "1 tbsp of sherry vinegar",
      "water boiled"
    ],
    cuisine: "Spanish",
    dishType: "soup",
    image: "https://www.recetasderechupete.com/wp-content/uploads/2020/05/Gazpacho-andaluz-Ajustes-de-rechupete-2-768x530.jpg",
    duration: 20,
    creator: "Recetas de Rechupete"
    })
    
  })
  .then(()=>{
    return Recipe.insertMany(data)
  })

  .then(()=>{
    console.log(data);
    return Recipe.insertMany([{
      title: "Pizza",
      level: "Amateur Chef",
      cuisine: "Italian"
  },
  {
      title: "Burger",
      cuisine: "American"
  }])
  })
  .then((title)=>{
    //no consigo que solo muestre el title
    console.log("Recipes created: ", title)
    // return Recipe.find({},{ title: 1 })

  })
  .then((data) => {
    console.log(data);
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("Recipe updated");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Recipe deleted");
    mongoose.connection.close(() => {
      console.log("Connection disconnected");
    });
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
