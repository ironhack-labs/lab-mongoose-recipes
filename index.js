const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({title: "Recipe Test",
              level: "Easy Peasy",
              ingredients:["tomato", "cheese"],
              cuisine: "American",
              dishType: "Dish",
              duration: 10,
              creator:"Elin",})
.then( (res) =>{ console.log(" Title of the recipe created:  ", res.title)})
.catch( (err) =>{console.log("An error occured during the creation of a recipe : ", err)})



Recipe.insertMany(data)
.then( (res) =>{ 
  
  res.forEach( r => console.log(r.title))


  Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese"}, {duration: 100 }, {new: true})
  .then( res => console.log(res ))
  // .catch(err => {console.log("erreur during update : ", err)});

  Recipe.deleteOne( {title: "Carrot Cake"})
  .then( res => {console.log( ` ${res.title} is deleted`)})
  // .catch(err => {console.log("erreur during deletion : ", err)});


})
.catch( (err) =>{console.log("An error occured during the insertion of many recipes : ", err)})



// mongoose.connection.close()


