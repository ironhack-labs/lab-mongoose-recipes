const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

recipeSchema = new Schema({
  title: {type: String, unique: true, required: true},
  level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: [String],
  cuisine: {type: String, required: true},
  dishType : {type:String, enum: ['Breakfast' , 'Dish' , 'Snack' , 'Drink' , 'Dessert', 'Dinner' , 'Other']  },
  image: {type:String, default:'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type:Number, min: 0},
  creator: String,
  created: {type:Date, default: Date.now}  
})

const Recipe = mongoose.model('Recipe',recipeSchema)

//Iteration 1 - insert 1

// Recipe.create({
//   title: "Beef Curry with Fish Version 3 no duration",
//   level: "UltraPro Chef",
//   cuisine: "exotic",
//   dishType: 'Dinner',
//   creator: "Tom"
// })
// .then((food) => {console.log("recipe added: ", food.title)})
// .catch((err) => {console.log("Database not updated", err)});


//Iteration 2 - INsert Many



// Recipe.insertMany(data)
// .then((recipes) => {
//   recipes.forEach((recipe)=>{
//     console.log(recipe.title);
//   })
// })
// .catch((err) => {console.log("Database not updated", err)});


Recipe.findByIdAndUpdate('5bdaeaee805b0b904b4516ac',{duration: 100})
.then(()=>{console.log('1')})
.catch(()=>{console.log('no')})

Recipe.updateOne({title: /Rigatoni/},{duration: 120})
.then(()=>{console.log('2')})
.catch(()=>{console.log('no')})

// Recipe.remove({title: /Carrot/})
// .then(()=>{console.log('yes')})
// .catch(()=>{console.log('no')})

Recipe.updateOne({title: /Rigatoni/},{duration: 700})
.then(()=>{console.log('3')})
.catch(()=>{console.log('no')})

// const disconnect = new Promise((resolve, reject) => resolve("Ironhack")); 
// disconnect.then(()=>mongoose.disconnect())

function disconnect(){ 
  setTimeout(() => {
    mongoose.disconnect();
    console.log('disconnect successful')
  }, 1500);
}

disconnect()
// const close 
// process.on('SIGINT', () => {  
//   mongoose.connection.close(() => { 
//     console.log('Mongoose default connection disconnected through app termination'); 
//     process.exit(0); 
//   }); 
// }); 