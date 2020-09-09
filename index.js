const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { update } = require('./models/Recipe.model');

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
  // Run your code here, after you have insured that the connection was made
  .then(() => Recipe.create([{ title: 'Popino', level: 'Easy Peasy' }]))
  .then(() => Recipe.insertMany(data))
  .then(() => Recipe.find())
  .then((allRecipies) => allRecipies.forEach (elm => console.log("Recipe:" ,elm.title)))
  .then(() => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true }))
  .then((updated) => console.log("Succes! Recipe uptadet!", updated.title, "new duration:", updated.duration))
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(() => Recipe.countDocuments())
  .then((count) => console.log("Succes! Recipes uptadet! New total of recipes are:", count))

  .then(()=>mongoose.connection.close())

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
