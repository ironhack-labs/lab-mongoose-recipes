const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    const recipe = {
      title: "Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu"
    }
    return Recipe.create(recipe)
  })
  .then(info => console.log("\nLa receta que se va a añadir es", info.title))
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(() => console.log("INSERTADO\n"))

  //UPDATE  
  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })
  .then(info => console.log("Se ha actualizado el objeto", info.title))

  //DELETE
  .then(() => {
    return Recipe.findOneAndDelete({ name: "Carrot Cake" })
  })
  .then(info => console.log("\nSe ha eliminado el objeto", info.title))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


process.on('SIGINT', () => {
  mongoose.connection.close()
  console.log('Mongoose default connection disconnected through app termination')
})