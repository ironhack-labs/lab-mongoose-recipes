const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const newRecipe = new Recipe({
  title: 'Brownie',
  level: 'Easy',
  ingredients: [
    '2 eggs',
    '1 teaspoon vanilla extract',
    '1 cup unsweetened cocoa powder',
    '2 cup all-purpose flour',
    '1 teaspoon salt',
    '1 teaspoon baking powder',
  ],
  cuisine: 'American',
  dishType: 'main_course',
  image: 'https://bakerbynature.com/wp-content/uploads/2020/04/Cocoa-Fudge-Brownies-1-of-1.jpg',
  duration: 10,
  creator: 'Kênia Araújo',

})
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
    .then(() => {
      return Recipe.create(newRecipe)
  }) .then((result) => {  
    console.log(newRecipe)
  }) .then(() => {
      return Recipe.insertMany(data)
  }) .then(() => {
      return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  }) .then(() => {
      console.log('Atualizado com SUCESSO!')
  }) .then(() => {
      return Recipe.deleteOne({title: "Carrot Cake"})
  }) .then(()=>{
    console.log('Deletado com SUCESSO!')
  }) 
  .catch(error => {
    console.error('Error connecting to the database', error);
  }) .finally(()=>{
     mongoose.connection.close()
  })