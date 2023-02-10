const mongoose = require('mongoose');
mongoose.set("strictQuery", false)

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
    // Run your code here, after you have insured that the connection was made
Recipe.create({
      title: "Soup",
      level: "Easy Peasy",
      ingredients: [
        "expired Chicken",
        "Rat Poison",
      ],
      cuisine: "French",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 20,
      creator: "Soloong"
    })
  })
  .then(() => {
    Recipe.insertMany(data)
    .then((recipe) => {
      for(let item of recipe){
        console.log(item.title)
      }
    })
    .then(()=>{
      Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 90})
      .then(() => {
        console.log("update successful")
      })
    })
    .then(()=>{
      Recipe.deleteOne({title: "Carrot Cake"})
      .then(() => {
        console.log("deletion successful")
        mongoose.connection.close();
      })
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });




  



