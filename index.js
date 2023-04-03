const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
mongoose.set('strictQuery', false);
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

          // iteration 2
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let newRecipe = {
      title:'Vegan Chocolate Cake',
      level:'Easy Peasy',
      ingredients:['almond milk','vegan butter','chocolate','flour'],
      cuisine:'European',
      dishType:'dessert',
      image:'https://biancazapatka.com/wp-content/uploads/2019/06/best-vegan-chocolate-cake-recipe-cherry-frosting-ganache.jpg',
      duration: 20,
      creator:'Bianka',
    };
    console.log(`New recipe added: ${newRecipe.title}`);
      return Recipe.create(newRecipe);
  })

            // iteration3
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(recipe =>{
    recipe.forEach(item =>{
      console.log(`recipe for ${item.title} added`)
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })



            // iteration 4

  .then(() => {
  return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100})
  })
  .then(()=> console.log('Recipe is updated'))
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
          // iteration5 

  .then(() => {
  return Recipe.deleteOne({title:'Carrot Cake'})
  })
  .then(()=>console.log('Carrot cake recipe was deleted'))
  .catch(error => {
  console.error('Error connecting to the database', error);
  })
          // iteration 6
  .then(() => {
  return mongoose.connection.close();
  })
  .then(()=>console.log('Connection closed'))
  .catch(error => {
  console.error('Error closing the database connection', error);
  });


