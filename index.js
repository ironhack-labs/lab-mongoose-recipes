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
    // console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => Recipe.create({
    title: "Asian  Chicken Thighs",
    level: "Amateur Chef",
    ingredients: ["1/2 cup rice vinegar", "5 tablespoons honey"],
    cuisine: "Asian",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 60,
    creator: "Chef LePapu"
  }))

  .then((Arecipe) => console.log(Arecipe.title))
  .then(() => Recipe.create(data))
  .then(recipes => recipes.forEach(elm => console.log(elm.title)))
  .then(() => Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }))
  .then(theRecipes => theRecipes.n === 1 && theRecipes.nModified === 1 && theRecipes.ok === 1 ? console.log('oh yeah') : null)
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(allRecipes => allRecipes.n === 1 && allRecipes.ok === 1 && allRecipes.deletedCount === 1 ? console.log('Here We Go!') : null)
  .then(() => mongoose.disconnect())




  .catch(error => {
    console.error('Error connecting to the database', error);
  });
