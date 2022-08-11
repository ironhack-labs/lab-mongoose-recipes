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
    Recipe.create({
      title: "Renovese",
    level: "Easy Peasy",
    ingredients: [
      "2 pounds e",
      "2 (toni",
      "1 tarjoram leaves",
      "1 piepper",
      "2 tableano cheese"
    ],
    cuisine: "Itan",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
    duration: 220,
    creator: "Chef"
    })
    .then(recipe => {
      console.log(recipe.title);
    })
  })
  .then(
    ()=>Recipe.insertMany(data).then((recipe) => {
    for(const val of recipe) {
      console.log(val.title)
  }
  })).then(
    ()=>Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{duration:100}
    ))
    .then(()=>Recipe.deleteOne({title: 'Carrot Cake'}
    )).then(()=>mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  