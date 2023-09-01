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
    Recipe.create({ title: "Pizza Pepperoni", level: 'UltraPro Chef', ingredients: ['100gr pizza dough', '200gr tomato sauce', '100gr pepperoni', '100gr mozzarella', '100gr mozzarella buffala', '3 basil leaves'], cuisine: 'Italian', dishType: 'main_course', image: "https://i0.wp.com/osojimix.com/wp-content/uploads/2022/06/Para-la-masa-de-pizza-napolitana-8-hrs-fermentacion-Web-1.jpg?w=500&ssl=1", duration: 60, creator: 'Jorge & Alex' })
    return Recipe.insertMany(data)
  })

  .then(() => {
    return Recipe.find()
  })

  .then((recipes) => {
    recipes.forEach(eachRecipe => {
      console.log(eachRecipe.title)
    })
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })

  .then(() => {
    console.log('Recipe succesfully modified!')
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })

  .then(() => {
    console.log('Recipe succesfully removed!')
    mongoose.disconnect()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
