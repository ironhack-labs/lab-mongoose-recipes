const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  const recipeSchema = new Schema({
    title: {type: String, required: true, unique: true},
    level: { type: String, enum: ['Easy Peasy','Amateur Chef','UltraPro Chef'] },
    ingredients: { type: Array},
    cuisine: {type: String, required: true,},
    dishType: {type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
    image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {type: Number, min: 0},
    creator: {type: String},
    created: {type: Date, default:Date.now}
  });

  const Recipe =  mongoose.model('Recipe', recipeSchema);

  Recipe.collection.drop();

// for(let i = 0;i < data.length;i++){
//   Recipe.create({title: data[i].title, level: data[i].level,ingredients: data[i].ingredients, cuisine:data[i].cuisine,dishType:data[i].dishType,image:data[i].image,duration:data[i].duration,creator:data[i].creator})
//   .then((recipe) => { console.log('The user is saved and its value is: ', recipe) })
//   .catch((err) => { console.log('An error happened:', err) });
// }

Recipe.insertMany(data,function(error,docs){});

