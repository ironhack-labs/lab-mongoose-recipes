const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'


// Recipe.create({title : "Lentilles con aqua", level: "UltraPro Chef", ingredients: ["lentilles", "eau"], cuisine: "Poor", dishtype: "Dish", image: "./assets/lentils.jpg", duration : 67, creator: "cessflech"}) ;

// Recipe.insertMany(data)
//   .then (x => console.log(`WP ${x} est content`))
//   .catch (err => console.error("ça a foiré françoise", err))

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

  function readRecipes() {
    Recipe.find()
  .then(dbRes => {
    console.log(dbRes);
    console.log(dbRes.length)
  })
  .catch(dbErr => {
    console.error(dbErr);
  })
}
Recipe.
  find().
  select('title').


Recipe.updateOne(
  {title: "Rigatoni alla Genovese"},
  {duration: 100},
  {new : true}
) 
.then (dbRes => {
  console.log("yay, we might actually be able to do something some day")
})
.catch (dbErr => {
  console.log("nay, you suck, byebye loser")
})

Recipe.deleteOne(
  {title: `Carrot Cake`}
)
.then (dbRes => {
  console.log("WE HAVE SUCCESSFULLY DELETED THE BAD CARROT CAKE RECIPE, BOOOOYAH CARROT CAKE")
})
.catch (dbErr => {
  console.log("DAYUM, WE REAAAAALLY SUCK AT THIS WEBDEV THINGY")
})