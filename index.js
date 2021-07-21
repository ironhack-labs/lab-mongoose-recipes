const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    //2
  const pokebol = {
    title: "pokebol",
    level: "Amateur Chef",
    ingredients: [
      "Sliced cucumber",
      "Sliced radish",
      "Sliced or cubed avocado",
      "Furikake",
      "Thinly sliced scallions",
      "Red pepper flakes",
    ],
    cuisine: "hawaiian",
    dishType: "main_course",
    duration: 20,
    creator: "Chef whatever",
  }

    Recipe.create(pokebol)
    .then((Recipe => {
      console.log(Recipe.title);
    }))
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//3

Recipe.insertMany(data)
.then((Recipe)=> {
  Recipe.forEach(element => {
    console.log(element.title)
  })
})

//4
Recipe.findOneAndUpdate(
  {title: "Rigatoni alla Genovese"},
  {duration: 100},
)
.then((updatedRecipe) => {
  console.log("Rigatoni alla Genovese's recipe is successfully updated !")
})
.catch((error)=>{
  console.log(error);
})

//5
Recipe.findOneAndDelete({title:"Carrot Cake"})
.then (()=> {
  console.log("Carrot cake is gone")

})
.catch ((error)=>{
  console.log(error)
})

//6
// mongoose.connection.close()
