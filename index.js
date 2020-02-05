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

Recipe.create({
  title: 'Fried egg',
  level: 'UltraPro Chef',
  ingredients: ["1 or two eggs", "oil", "A little of magic"],
  cuisine: 'MasterChef',
  dishType: 'Dish',
  image: 'https://www.pequerecetas.com/wp-content/uploads/2015/11/huevo-frito-microondas.jpg',
  duration: 5,
  creator: 'Jota'
}).then((recipeCreated => {
  console.log(recipeCreated.title);
}))

Recipe.insertMany(data).then(
  recipesCreated => recipesCreated.forEach(recipe => console.log(recipe.title)
))

Recipe.findByIdAndUpdate("5e3b0a4d34c7378c459ede1c", {
  duration: 100}).then(console.log("Your Recipe is updated"))

Recipe.findByIdAndDelete("5e3b0a4d34c7378c459ede1b").then(console.log("OUUUUUH MAMA"))


.then(()=> {
  return mongoose.connection.close()
})