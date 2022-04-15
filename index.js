const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'

const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'

const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

const newData = { 
    title: 'No Bake Cookies',
    level: 'Easy Peasy',
    ingredients: ['Sugar', 'Butter', 'Milk','Unsweetened cocoa powder','Vanilla', 'Quick oats', 'Peanut butter'],
    cuisine: 'Bakery',
    dishType: 'dessert',
    image: 'http://www.cookingclassy.com/wp-content/uploads/2012/06/no-bake-cookies-6-768x1154.jpg',
    duration: 33,
    creator: "Cooking Classy",
    created: Date('2018-07-12')
    };


mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
      Recipe.create(newData)
      // .save()
      .then(recipe => console.log('The recipe is saved and its value is: ', recipe)) //data instead of recipe?
      .catch(error => console.log('An error happened while saving the recipe:', error))
  
      Recipe.insertMany(data)
      .then(recipesArray => {
        
        recipesArray.forEach(Element => console.log(Element.title));
    
const myUpdateQuery = {title: 'Rigatoni alla Genovese'};

const myUpdateData = {duration: 100};

Recipe.findByIdAndUpdate(myUpdateQuery, myUpdateData)
.then(updated => console.log('updated document', updated))
.catch(err => console.log(err));

const myDeletionQuery = {title: 'Carrot Cake'};

Recipe.deleteOne(myDeletionQuery)
.then(deleted => console.log('Deletion Successful', deleted))

.catch(error => {
    console.error('Error connecting to the database', error);
       

      });
       mongoose.connection.close(){
       .then(()=> console.log('Connection close success', )
       )};