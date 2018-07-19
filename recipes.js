const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipeSchema = new Schema({
    title: { type: String, required: true , unique:true},
    level: { type: String, enum:['Easy Peasy','Amateur Chef','UltraPro Chef'] },
    ingredients: { type: Array },
    cousine: { type: String, required: true},
    dishType:{type:String,  enum: ['Breakdast', 'Dish', 'Snak','Drink','Dessert','Other']},
    image: {type: String, default:' https://images.media-allrecipes.com/images/75131.jpg'},
    duration:{ type : Number,min:0},
    creator:{type:String},
    created:{type:Date,default:Date.now()},

  });
  //console.log(recipeSchema);

const recipe = mongoose.model('recipe',recipeSchema);

recipe.create({ title: 'lo que sea', cousine: 'algo' })
  .then((recipe) => { console.log('The user is saved and its value is: ', recipe) })
  .catch((err) => { console.log('An error happened:', err) });

  recipe.insertMany(data)
  .then((recipe) => { console.log('The user is saved and its value is: ', recipe) })
  .catch((err) => { console.log('An error happened:', err) });

  recipe.updateOne({ title: "Rigatoni alla Genovese"},{duration: 100})
  .then((recipe) => {console.log('ok',recipe)})
  .catch((err) => {console.log('error')})

  recipe.deleteOne({ title: " Carrot Cake"})
  .then((recipe) => {console.log('delete',recipe)})
  .catch((err) => {console.log('error')})

  .close(); 