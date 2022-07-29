const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model');

const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

 /*  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`); */
    // Before adding any recipes to the database, let's remove all existing ones
    /* return Recipe.deleteMany() */


  //.then((newRecipe) => {
    /* Recipe.create({
      title: 'Carbonara',
      level: "Easy Peasy",
      ingredients: ['300g of linguini', '100g pecorino cheese', '100g parmeggiano reggiano cheese', '1 egg yolk', 'black peper', 'salt', 'pasta water', '100g guanciale'],
      cuisine: 'main_course',
      duration: 10,
      creator: 'The best italian ever',
    }) */
   /*  .then((newRecipe) => console.log('New recipe created: ')) */
   //Recipe.insertMany([...data])
//.then((newRecipe) => console.log (newRecipe))
/* .then(() => {

  Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then((newRecipe) => console.log(newRecipe))
}) */
/* .then(() => {
Recipe.deleteOne({ title: 'Carrot Cake' })
.then((newRecipe) => console.log('Carrot Cake no longer available'))
}) */

 /*  .catch(error => {
    console.error('Error connecting to the database', error);
  }); */

async function recipes() {
try {
  await mongoose
  .connect(MONGODB_URI)
  await Recipe.deleteMany()
  let newRecipe = await Recipe.create({title: 'Carbonara',
      level: "Easy Peasy",
      ingredients: ['300g of linguini', '100g pecorino cheese', '100g parmeggiano reggiano cheese', '1 egg yolk', 'black peper', 'salt', 'pasta water', '100g guanciale'],
      cuisine: 'main_course',
      duration: 10,
      creator: 'The best italian ever'});
      console.log('New recipe created');
      
      let insertMany = await Recipe.insertMany([...data])
      let updateOne = await Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      let deleteOne = await Recipe.deleteOne({ title: 'Carrot Cake' })
  mongoose
  .disconnect()
} catch(err) {
  console.log(err)
}
}
recipes()