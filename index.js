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
  .then(() => Recipe.syncIndexes())
  .then(() => {
    Recipe
            .create({ 
            title: 'Pancakes', 
            level:'Easy Peasy', 
            ingredients:['Flour', 'Milk', 'Eggs'],
            cuisine:'American',
            dishType: 'dessert',
            image: 'https://annaspasteleria.com/images/2019post/_videoCover/DSC_5143webnl.jpg',
            duration: '15',
            creator: 'El tito maiky'
          })
  })
  .then(()=> {
    return Recipe
            .create(data)
            .then(allRecipes => allRecipes.forEach(element => {
              console.log(element.title)
            }))
            .catch(error=> console.log(error))
  })
  
  .then(()=> Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration: 100}))
  .then(console.log('Recipe was updated successfully!'))
  .then(()=> Recipe.deleteOne({title:"Carrot Cake"}))
  .then(()=> mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
