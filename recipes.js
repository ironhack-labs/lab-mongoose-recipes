const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  mongoose.connection.on('connected', () => {  
    console.log('Mongoose default connection open');
  }); 
  
  // If the connection throws an error
  mongoose.connection.on('error', (err) => {  
    console.log('Mongoose default connection error: ' + err);
  }); 
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {  
    console.log('Mongoose default connection disconnected'); 
  });
  
  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', () => {  
    mongoose.connection.close(() => { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  }); 
  
  
/*
- **title**. Type `String`. It should be required and unique.
- **level**. Type `String`. Only can be one of the following values: *Easy Peasy* - *Amateur Chef* - *UltraPro Chef* (remember the ENUM :wink:)
- **ingredients**. Type `Array`.
- **cuisine**. Type `String`. Should be required.
- **dishType**. Type `String`. Possible values: *Breakfast* - *Dish* - *Snack* - *Drink* - *Dessert* - *Other*.
- **image**. Type `String`. Default value: *https://images.media-allrecipes.com/images/75131.jpg*.
- **duration**. Type `Number`. Min value should be 0.
- **creator**. Type `String`
- **created**. Type `Date`. By default today.
*/

const recipeSchema = new Schema({
  title : {type: String, require:true, unique:true}, 
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef','UltraPro Chef']},
  ingredients: Array,
  cuisine: {type: String, required:true},
  dishType: {type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min:0},
  creator: String,
  created: {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// module.exports - Recipe;


// Recipe.create({
//   title : "orangen saft",
//   level: "Easy Peasy",
//   ingredients: ['apples', 'sugar', 'flour', 'butter'],
//   cuisine: "British",
//   dishType: 'Dessert',
//   image: "https://cdn.donnahaycdn.com.au/images/content-images/classic_applecrumble.jpg",
//   duration: 60,
//   creator: "Samanta",
//   created: Date.now,
// }) 
// .then((recipe) => { console.log('Recipe title ', recipe.title) })
//   .catch((err) => { console.log('An error happened when creating your recipe:', err) });


//  Recipe.insertMany(
//    data
//   ).then((res) => {
//     console.log('Recipe title is', res.title)
//   }).catch ((err) => {console.log ("An error happened when insertingMany from data.js")})
    
  
Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
.then((recipe) =>  {console.log ("Congrats you updated the duration of your recipe")})
.catch ((err) => {console.log ("An error happened when updating your recipe")})

Recipe.findByIdAndRemove("5bdafededf31c2a712f41c4f")
.then((recipe) =>  {console.log ("Congrats you removed the Carrot Cake")}


)

.catch ((err) => {console.log ("An error happened when deleting your carrot cake")})


function disconnect(){ 
  setTimeout(() => {
    mongoose.disconnect();
    console.log('disconnect successful')
  }, 1500);
}

disconnect();