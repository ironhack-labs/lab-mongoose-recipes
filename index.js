const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

Recipe
.create({
  title: "Spaghetti",
  level: "Easy Peasy",
  ingredients: ["pasta", "vegetables"],
  cuisine: "Italian",
  dishtype: "Dish",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 5,
  creator: "Charles Van den Bergh",
  created: '12/03/2020'
})
.then(recipe => {console.log(Recipe.title)})
.catch(error => {console.log("An error in create happened!",error)})
 

Recipe
.insertMany(data)
.then(user => {
  for(var i=0; i< data.length; i++) {
    console.log(data.title)}})
.catch(error => {
  console.log("An error in insertmany happened",error)
})


Recipe
.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
.then(recipe => {console.log("Succesfully updated!")})
.catch(error => {console.log("An error in updateone happened",error)})

Recipe
.deleteOne({title: "Carrot Cake"})
.then(recipe => {console.log("Succesfully removed!")})
.catch(error => {console.log("An error in deleteone happened",error)})

mongoose.connection.close()
