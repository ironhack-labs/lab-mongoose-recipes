const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  const today = new Date();

  Recipe.create({                          //iteration 2 create a recipe
    title: 'Pasta Carbonara',
    level: 'Easy Peasy',
    ingredients: ['spaghetti', 'bacon', 'eggs', 'parmesan cheese', 'black pepper', 'salt'],
    cuisine: 'Italian',
    dishType: 'main_course',
    duration: 30,
    creator: 'Chef Giovanni',
    created: today,                  //todays date.
  }) 
  
  .then(recipe => {             
    console.log(`New recipe added: ${recipe.title}  created on ${recipe.created}`);  
  })

  Recipe.insertMany(data)  //iteration 3:insert many
.then(() => {
  data.forEach((recipe) => console.log('Inserted recipe:', recipe.title));
  return data;
})
  .then (() => {                     //Iteration 4 :Update receipe
    console.log('Rigatoni alla Genovese recipe was updated');
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    return data;
  })
  .then (() => {
    console.log('No more Carrot cakes! Carrot Cake deleted Successfully');    //Iteration 5:Remove a receipe with success message
   return Recipe.deleteOne({ title: 'Carrot Cake' } );
  })
  .then(() => {
    console.log('Connection closed');    //Iteration 6:Close the  database connection
    return mongoose.connection.close();
  })
  .catch(error => {
    console.error(error);
  });