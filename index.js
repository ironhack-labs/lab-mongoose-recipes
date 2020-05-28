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
    // return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  let myRecipe = {
    title: 'Tiramisu',
    level: 'Amateur Chef',
    ingredients: ['3 eggs', "2 big marscapone", "1 cream", "3 cups of coffee", "cacao powder"],
    cuisine: "French",
    dishType: "dessert",
    duration: 30,
    creator: "Arune"
  }
//iteration 2
  let my = Recipe.create(myRecipe)
  .then((res) => {
    console.log("new recipe created", res.title)
  })
  .catch(() => {
    console.log("something went wrong")
  })

  //iteration 3
  let allData = Recipe.insertMany(data)
  .then((res) => {
    for(let i = 0; i < res.length; i++){
      console.log(res[i].title);
    }
  })
  .catch(() => {
    console.log('something went wrong')
  })

  //iteration 4
  let dura = Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {$set: {duration: 100}})
  .then((res) => {
    console.log('updated', res)
  })
  .catch(() => {
    console.log("Something went wrong")
  })
  //iteration 5
let carrot = Recipe.deleteOne({title: 'Carrot Cake'})
.then((res) => {
  console.log("deleted", res)
})
.catch (() => {
  cosnsole.log('something went wrong')
})
//iteration 6
Promise.all([my, allData, dura, carrot]) 
.then((res) => {
  mongoose.connection.close()
  .then((res) => {
    console.log('closing the database')
  })
  .catch(() => {
    console.log('something went wrong')
  })
})
.catch(() => {
  console.log('Something went wrong')
})