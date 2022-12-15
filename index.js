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
  .then(() => 
    // Run your code here, after you have insured that the connection was made
    //ITERATION 2
    Recipe.create({
      title: "Spaghetti Carbonara",
      level: "Easy Peasy",
      ingredients: ["spaghetti", "eggs", "pancetta", "parmesan cheese", "black pepper"],
      cuisine: "italian",
      dishType: "main_course",
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?resize=768,574",
      duration: 15,
      creator: "Gustavo"})
      )
    .then(Recipe => console.log("title of recipe", Recipe.title))
    .catch(error => {
    console.error('Error connecting to the database', error);
    });

    //ITERATION 3
    Recipe.deleteMany()

    .then(() => Recipe.insertMany(data)) 
    .then(recipe => console.log("title of recipes", Recipe.title))
    .catch(error => {
    console.error('Error insert many', error);
    });
    //ITERATION 4
    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    .then(Recipe => console.log('updated Recipe: '))

    //ITERATION 5
    Recipe.deleteOne({title: "Carrot Cake"})
    .then(Recipe => console.log('deleted recipe'))


    //ITERATION 6
    // .then(() => mongoose.disconnect())
    // .catch(err => {console.log(err)})
