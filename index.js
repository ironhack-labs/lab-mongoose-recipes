const mongoose = require('mongoose');


// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

const newRecipe = {
  title: 'Crema Catalana',
  leve: 'Amateur Chef',
  ingredients: ['milk', 'cornstarch', 'lemon and orange peel', 'cinnamon stick', 'egg yolks', 'sugar'],
  cuisine: 'Catalan Food',
  dishTypes: 'dessert',
  image: undefined,
  duration: 10,
  creator: 'Jordi Davesa',
  created: undefined
}


mongoose
  .connect(MONGODB_URI, {
   /*  useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true */
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(newRecipe) 
  })

  .then(data => {console.log('Create new recipe: ', newRecipe.title)})

  .then(() => {
    return Recipe.insertMany(data) 
  })

  .then(data =>{for(elem of data){console.log('Add new recipe: ',elem.title)}})

  .then(()=>{
     return Recipe.findOneAndUpdate({title : "Rigatoni alla Genovese"}, {duration : 100}, {new:true})
  })

  .then(()=>{console.log('Element updated!')})

  .then (()=>{
    return Recipe.deleteOne({title: "Carrot Cake"})
  })

  .then(()=>{console.log('Element deleted!')})

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

mongoose.connection.close();


  
