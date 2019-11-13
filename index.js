const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

mongoose.connection.collections[`recipes`].drop(err=>console.log(`collection dropped`));

Recipe.create({
  title: "Lentejas con chorizo",
  level: "Easy Peasy",
  ingredients: ["lentejas", "cebolla", "patata", "zanahoria", "chorizo", "tocino", "ajo"],
  dishType: "Dish",
  cuisine: "Spanish",
  image: "mis_lentejas.png",
  duration: 15,
  creator: "Gabriel",
  
}).then(recipieCreated => {
  console.log(recipieCreated.title);
  return Recipe.insertMany(data);
}).then(inserted=>{
  inserted.forEach(recipie => console.log(recipie.title));
  return Recipe.updateOne({title:'Rigatoni alla Genovese'}, {duration: 100});
}).then(()=>{
  console.log(`Updated recipe`);
  return Recipe.deleteOne({title:'Carrot Cake'});
}).then(()=>{
  console.log(`Deleted recipe`);
  
})

