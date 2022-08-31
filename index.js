const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(mongooseConnect => {
    console.log(`Connected to the database: "${mongooseConnect.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()
  })
  .then(() => {
    //  Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data)
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  })
  .then(() => {
    // const deleted = Recipe.deleteOne({ title: "Rigatoni alla Genovese" })
    // console.log("borrado")
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then((borrado) => {
    console.log(borrado)
  })
  .catch(error => {
    //   console.error('Error connecting to the database', error);
  });


mongoose.disconnect();


/*
data.forEach(element => {

  const newDish = new Recipe({
    title: element.title,
    level: element.level,
    ingredients: [
      element.ingredients
    ],
    cuisine: element.cuisine,
    dishType: element.dishType,
    image: element.image,
    duration: element.duration,
    creator: element.creator
  })

  newDish
    .save()
    .then((element) => {
      console.log(element);
    })
    .catch((err) => console.log(err));

}); */
