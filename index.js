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
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    /**
     * Iteration 2 - Create a recipe
     */

    Recipe.create({    
      title:"Paella",
      level:"Amateur Chef",
      ingredients:["rice","bell peppers","paprika","garlic","artichoke"],
      cuisine:"Mediterranean",
      dishType:"main_course",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/01_Paella_Valenciana_original.jpg/1024px-01_Paella_Valenciana_original.jpg",
      duration:120,
      creator:"unknown"
    })
    .then(()=>console.log('A new recipe has been created.'))
    .catch(err=>console.log('Error while creating a new recipe!'))


    /**
    * Iteration 3 - Insert multiple recipes
    */

    .then(()=>{
      return Recipe.insertMany(data)
      .then(productsArr=>{
        productsArr.forEach(el=>console.log('Inserted recipe: ',el.title))
      })
    .catch(err=>console.log(`An error happened:${err}`));
    })

    /**
    * Iteration 4 - Update recipe
    */

    .then(()=>{
      return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{$set:{duration:100}})
      .then(()=>console.log(`Recipe was updated`))
      .catch(err=>console.log('An error occurred while updating: ', err));
    })

    /**
     * Iteration 5 - Remove a recipe
     */

    .then(()=>{
      return Recipe.deleteOne({title:'Carrot Cake'})
      .then(()=>console.log(`Recipe was deleted`))
      .catch(err=>console.log('An error occurred while updating: ', err));
    })

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });