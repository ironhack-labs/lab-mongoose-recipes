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
    //return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    console.log('Connection successful')
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

const myRecipe = {title: 'Kartoffelpuffer', level: 'Easy Peasy', ingredients: ['potatoes', 'onion', 'eggs', 'salt', 'pepper'], cuisine: 'German', dishType: 'main_course', duration: 30};


Recipe.insertMany(data)
  .then((recipe) => console.log(`This recipe was saved ${recipe}`))
  .catch((err) => console.log(err));

Recipe.create(myRecipe)
  .then((recipe) => console.log(`This recipe was saved ${recipe}`))
  .catch((err) => console.log(err));


Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  .then((user) => console.log(user))
  .catch((err) => console.log(err));

Recipe.deleteOne({title: "Carrot Cake"})
  .then((user) => console.log(user))
  .catch((err) => console.log(err));


mongoose.connection.close()