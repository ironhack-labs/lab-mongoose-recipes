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


  mongoose.connection.on("disconnected", () =>
  console.log("Mongoose disconnected")
);

let recipe1 = {
  title: "tortilla",
  level: "UltraPro Chef",
  ingredients: "potatoes and eggs",
  cuisine: "Spanish",
  dishType: "Dish",
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 30,
  creator: "Abel",
  created: Date.now(),
}

 Recipe.create(recipe1)
 .then((createdRecipe) => {
   console.log("New recipe created", createdRecipe)
 }).catch((err) => {
 })
 Recipe.insertMany(data)
   .then(function (result) {
     result.forEach( function(element) {
       console.log(element.title)
     } )
   })
   .catch(err => {
     console.log(err);
   });



 Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration:  100 } })
 .then((result) => {
   console.log('Duration updated successfuly')
  
   mongoose.connection.close()
 })
 .catch(err => console.log(err));

 Recipe.deleteOne({ title:'Carrot Cake'})
  .then( (result) => console.log('Success deleting recipe'))
  .catch(err => console.log(err));


// const promise1 = Recipe.create(recipe1)
// const promise2 = Recipe.insertMany(data)
// const promise3 = Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration:  100 } })
// const promise4 = Recipe.deleteOne({ title:'Carrot Cake'})

/*
 Promise.all( [ promise1, promise2, promise3, promise4 ] )
 .then((arrayOfResovedPromises) => {
   mongoose.connection.close()
 }).catch((err) => {
   console.log(err);
 });
*/


