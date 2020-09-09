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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Pizza Carbonara",
      level: "Easy Peasy",
      ingredients: ["masa", "onion", "beacon", "cream"],
      cuisine: "Italiana",
      dishType: "main_course",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Frecetinas.com%2Fpizza-carbonara-casera%2F&psig=AOvVaw3u5m9xaY7adMIy9nSr1Ltk&ust=1599742106753000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLDgs_qN3OsCFQAAAAAdAAAAABAD",
      duration: 10,
      creator: "David"
    })
  })
  .then(firstRecip => console.log(firstRecip.title))
  .then(() => Recipe.insertMany(data))
  .then((recipe) => recipe.forEach(elm => console.log(elm.title)))
  .then(() => Recipe.updateOne({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  }))
  .then(() => console.log("Receta actulizada."))
  .then(() => Recipe.deleteOne({
    title: "Carrot Cake"
  }))
  .then(() => console.log("Receta eliminada."))
  .then(() => mongoose.connection.close())

  .catch(error => console.error('Error connecting to the database', error));