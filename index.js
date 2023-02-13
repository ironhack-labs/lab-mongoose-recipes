const mongoose = require('mongoose');
mongoose.set("strictQuery", false)

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose.connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Salmon with green beans and white wine sauce",
      level: "Amateur Chef",
      ingredients: ["Salmon", "green beans", "white wine", "onions", "olive oil"],
      cuisine: "?",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 60,
      creator: "Me",
      created: '2019-08-09'
    }).then(newRecipe => {
      console.log(newRecipe)
    })

    Recipe.insertMany(data).then(res => {
      console.log("all recipe inserted")
  }).then(() => {
      console.log(data.title)
  })


  .then(() => {

    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(response => {
      console.log(response)
      console.log(" Time Duration fix")
    })
  })



  .then(() => {
  Recipe.deleteOne( { title: "Carrot Cake"}).then(res => {
    console.log(res)
    console.log("Carrot Recipe has been delete")
  })
  })
  

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  console.log(Recipe.find())