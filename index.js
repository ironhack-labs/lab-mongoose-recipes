const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)
const Recipe = require('./models/Recipe.model');
const data = require('./data');
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => Recipe.create({
    title: "Fried Egg Grilled Cheese Sandwich",
    level: "Easy Peasy",
    ingredients: [
      "4 slices of bread (thick Texan style)",
      "4 slices of cheese",
      "Butter",
      "Salt",
      "Pepper"
    ],
    cuisine: "International",
    dishType: "main_course",
    image: "https://www.yummly.com/recipe/Fried-Egg-Grilled-Cheese-Sandwich-2341174?prm-v1",
    duration: 20,
    Creator: "Melissa",
  }))
  .then(recipe => console.log(`La nueva receta creada es ${recipe.title}.`))
  .then(() => Recipe.create(data))
  .then(recipes => recipes.forEach((recipe, i) => console.log(`Recipe num ${i + 1}: ${recipe.title}`)))
  .then(() => Recipe.findOneAndUpdate({
    title:"Rigatoni alla Genovese"
  }, {
    duration: 100
  }, {
    new:true
  }))
  .then(updateRecipe => console.log(`La receta actualizada es: ${updateRecipe.title} la nueva duración es: ${updateRecipe.duration}`))
  .then(() => Recipe.deleteOne({
    title:"Carrot Cake"
  }))
  .then(deleteRecipe => console.log("La receta se eliminó con éxito, estos son los detalles:", deleteRecipe))
  .then(() => mongoose.connection.close(() => console.log("Mongoose disconected")))
  .catch(error => {
  console.error("Error connecting to the database", error);
  });


