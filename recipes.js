const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp');




const recipeSchema = new Schema({
  title : {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: {type: Array},
  cuisine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: ' https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
});

Recipe.insertMany(data, function(error, docs) {});

// Example:
// var arr = [{ name: 'Star Wars' }, { name: 'The Empire Strikes Back' }];
// Movies.insertMany(arr, function(error, docs) {});


Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100})
.then(successCallback)
.catch(errorCallback);

// // For the first "Alice" found, change the company to "Ironhack"
// User.updateOne({ name: "Alice"}, { company: "Ironhack" })
//   .then(successCallback)
//   .catch(errorCallback);


User.deleteOne({ title: "Carrot Cake"})
  .then(successCallback)
  .catch(errorCallback);

// // Delete the first "Alice" found
// User.deleteOne({ name: "Alice"})
//   .then(successCallback)
//   .catch(errorCallback);


// // When the connection is disconnected
// mongoose.connection.on('disconnected', () => {  
//   console.log('Mongoose default connection disconnected'); 
// });


// When the connection is disconnected
mongoose.connection.on('disconnected', () => {  
  console.log('Mongoose default connection disconnected'); 
});



const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
 Recipe.create({title: 'Pizza'})
  .then(recipe => {console.log('The user is saved and its value is: ', recipe.title) })
  .catch(err => {console.log('An error happened:', err) });

  // comprobar si funciona 

//   // The same code as above but with a Promise version
// User.create({ name: 'Alice', password:"ironhack2018", job: 'Architect' })
// .then(user => { console.log('The user is saved and its value is: ', user) })
// .catch(err => { console.log('An error happened:', err) });




const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/exampleApp'); 

let Student = mongoose.model('Student', { firstname: Stringc});
let City = mongoose.model('City', { name: String });

let promise1 = Student.insertMany([{ firstname: 'Alice' }, { firstname: 'Bob' }]);
let promise2 = City.insertMany([{ name: 'Madrid' }, { name: 'Barcelone' }, { name: 'Paris' }]);

Promise.all([promise1, promise2])
  .then(values => { 
    console.log("students and cities has been inserted");
    console.log(values);
    /*
    [ [ { _id: 5a4e462048841e65562c465a, firstname: 'Alice', __v: 0 },
      { _id: 5a4e462048841e65562c465b, firstname: 'Bob', __v: 0 } ],
    [ { _id: 5a4e462048841e65562c465c, name: 'Madrid', __v: 0 },
      { _id: 5a4e462048841e65562c465d, name: 'Barcelone', __v: 0 },
      { _id: 5a4e462048841e65562c465e, name: 'Paris', __v: 0 } ] ]
    */
    mongoose.connection.close();
  })
  .catch(err => console.error(err));







  



  