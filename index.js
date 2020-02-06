const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'
// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));
  
  //Iteration 2 - Create a recipe
  
  let recipe1 ={
    title: "ommelet",
    level: "Easy Peasy",
    ingrediants: ["salt", "egg"],
    cuisine :" Belgian",
    dishType: "Snack",
    duration:2,
    creator:"david",
  };
  Recipe.create( recipe1 , (err, result) => {
    if (err) console.log(err);
    else console.log('Document inserted', result);
  }
);

//Iteration 3 - Insert multiple recipes
Recipe.insertMany(data)
  .then( (data) => {
    data.forEach( (recipe) => console.log(recipe.title));   
  })
  .catch(err=> console.log(err));
//Iteration 4 - Update recipe


Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration:  100 } })
  .then((result) => console.log('duration successfuly updated', result))
  .catch(err => console.log(err));

  //teration 5 - Remove a recipe
  Recipe.deleteOne({ title:'Carrot Cake'})
  .then( (result) => console.log('Success deleting recipe', result))
  .catch(err => console.log(err));

  //Iteration 6 - Close the Database




