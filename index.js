const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js' 
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

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
      title: "Moldy Raw Chicken",
      level: "Amateur Chef",
      ingredients: [
        "expired Chicken",
        "Rat Poison",
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef Diogo"
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
      Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
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


