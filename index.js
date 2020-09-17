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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.on("error", () => {
    console.error("NAY : database connection failed !!!");
  });
  
  mongoose.connection.on("connected", () => {
    console.log("YAY : Database connected !!!");
  });

// ---------------------------
// Lab starting from here
var jsonRecipe = require('./data.json');

mongoose.set('useFindAndModify', false);

async function launchCRUD() {

  // Iteration 2
  const newRecipe = await Recipe.create({
    title: 'Poulet Cumin',
    level: 'Easy Peasy',
    ingredients: ['Poulet', 'Huile Végétale', 'Cumin', 'Sel', 'Curry', 'Poivre'],
    cuisine: 'Bonne',
    dishtype: 'main_course',
    image: 'https://recettes.de/images/blogs/le-blog-de-clementine/poulet-roti-epice-a-l-indienne-et-pommes-de-terre-au-cumin.640x480.jpg',
    duration: 10,
    creator: "Chef Nicole",
    created: Date('2020-09-17'),
  });
  console.log(newRecipe.title);
  // Itertaion 3
  const manyNewRecipe = await Recipe.insertMany(jsonRecipe);
  for (let i= 0; i<manyNewRecipe.length; i++) {
    console.log(manyNewRecipe[i].title)
  };
  // Iteration 4
  const updateRigatoniGenovese = await Recipe.findOneAndUpdate(
    { title: 'Rigatoni alla Genovese' },
    { duration: 100 },
    { new: true },
  );
  console.log(updateRigatoniGenovese);
  // iteration 5
  const removeCarrotCake = await Recipe.deleteOne({
    title: "Carrot Cake",
  })
  console.log(removeCarrotCake)
}
launchCRUD()

// Iteration 6
mongoose.disconnect()


