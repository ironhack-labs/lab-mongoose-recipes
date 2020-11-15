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


//RECIPE

const recipe = {

    title: "Pizza",
    level: "Amateur Chef",
    ingredients: ["Marinara", "Pepper", "Onion", "Cheese"],
    cuisine: "Italian",
    dishType: "Main_course",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 20,
    creator: "Southern Italy",
    created: Date.now
}

Model.create(recipe, (error, recipe) => {
  if (error) {
    console.log("Error occurred.", error);
    return
}
console.log(`The recipe was created:`, recipe)
})

Model.insertMany([], (error, recipe) => {
  if (error) {
    console.log("Error occurred.", error);
    return
}
console.log(`The recipe's name is:`, recipe)
})

Model.findOneAndUpdate([], (error, recipe) => {
  if (error) {
    console.log("Error occurred.", error);
    return
}

Model.updateOne({ name: 'Rigatoni alla Genovese' }, { duration: '100' })
.then(self => {
  console.log(`Connected to the database: "${self.connection.name}"`);
  return self.connection.dropDatabase();
})
.catch(error => {
  console.error('Error connecting to the database', error);
});
console.log(`The recipe's been updated:`, recipe)
})

User.deleteMany({ name: "Carrot Cake" })
.then(self => {
  console.log(`Connected to the database: "${self.connection.name}"`);
  return self.connection.dropDatabase();
})
.catch(error => {
  console.error('Error connecting to the database', error);
});

console.log(`The recipe's been deleted:`, recipe)
