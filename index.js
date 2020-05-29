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
  .then(()=> {
    return Recipe
    .create({
      title: "Brownie",
      level: "Easy Peasy",
      ingredients: [
        "4 eggs",
        "80g of flour",
        "150g of sugar",
        "125g of butter",
        "200g of dark chocolate"
      ],
      cuisine: "American",
      dishType: "dessert",
      duration: 15,
      creator: "Ironhacker"
    })
    .then((recipe)=>{console.log(recipe.title)})
    .catch(err => { console.log('An error happened:', err) })
  })
  .then(()=> {
    return Recipe
    .insertMany(data)
    .then((recipe)=> {
      for (const property in recipe) {
        console.log(recipe[property].title);
      }
    })
    .catch(error => {console.error('An error happened:', error)})
  })
  .then(()=> {
    return Recipe
    .findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    .then(() =>console.log('Updated successfully'))
    .catch(error => {console.error('An error happened:', error)})
  })
  .then(()=> {
    return Recipe
    .deleteOne({title: "Carrot Cake"})
    .then(() => console.log('Deleted successfully'))
    .then(() => {mongoose.connection.close()})
    .then(() => console.log('Database closed'))
    .catch(error => {console.error('An error happened:', error)})
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  




