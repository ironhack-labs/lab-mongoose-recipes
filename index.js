const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create()
    const newRecipe = {
      title: "Bolognese Pasta",
      level: "Easy Peasy",
      ingredients: ["pasta", "tomato sauce", "cheese"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://example.com/image.jpg",
      duration: 30,
      creator: "John Doe",
    };
    // return Recipe.create(newRecipe);

  })
  .then((createdRecipe) => {
    console.log(`Created recipe: ${createdRecipe.title}`);
  })
  .then(() => {

    return Recipe.insertMany(data);

  })
  .then(() => {
    console.log(`titles, ${data[0].title}`);
  })
  .then(updatedRecipe => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })

  })
  .then(() => {
    console.log('Updated succesfull')
  })

  .then((outcake) => {
    Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then((outcake) => {
    console.log('Deleted succesfully!')
  })
  .then(() => {
    console.log('Conection finished')
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.log('error conecting to the Database', err);
  })


  .catch((error) => {
    console.error('Error connecting to the database', error);
  });


Recipe.insertMany(data);
