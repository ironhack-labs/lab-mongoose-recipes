const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

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
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: "Rigatoni alla Genovese",
      level: "Easy Peasy",
      ingredients: [
        "2 pounds red onions, sliced salt to taste",
        "2 (16 ounce) boxes uncooked rigatoni",
        "1 tablespoon chopped fresh marjoram leaves",
        "1 pinch cayenne pepper",
        "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
      duration: 220,
      creator: "Chef Luigi"
    });
  })
  .then((name) => {
      console.info(console.debug(`Iteration 2: you just create the recipi ${name.title}.`))
  })
  .then(() => {
      return Recipe.insertMany(data);
  })
  .then((manyRecipes) => {
      console.info(`Iteration 3: Inserted many recipes.`)
  })
  .then(() => {
      return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {$set:  {duration: 100 }}, {new: true})
  })
  .then((updated) => {
      console.info(`Iteration 4: recipes updated.`)
  })
  .then(() => {
      return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then((deleted) => {
      console.info(`Iteration 5: a recipe has been deleted.`)
  })
  .catch((error) => {
    console.error(`Error connecting to the database`, error)
  })
  .finally(() => {
    mongoose.connection.close()
      .then(()=> {
        console.info(`Iteration 6: Disconnected from mongoose.`)
      })
      .catch((error) => console.error(`Error disconnecting from mongoose`, error))
  })
