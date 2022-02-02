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
  //Add a recipe of my own 
  Recipe.create({title:'Scrambled eggs with ham',level:"Easy Peasy",ingredients:['eggs','ham','cheese'],cuisine:'mexican',dishType:'breakfast',image:'https://previews.123rf.com/images/semenovp/semenovp1506/semenovp150600019/41781651-huevos-revueltos-con-jam%C3%B3n-y-queso.jpg',duration: 10,creator: 'Alan', created: 02/02/2022})
  .then((model) => console.log(model.title));

  //All recipes
  Recipe.insertMany(data)
  .then((res) => console.log(res));


  //FindOneAndUpdate
  Recipe.updateOne({ title: "Rigatoni alla Genovese" }, {duration: 100 })
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
  






  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




