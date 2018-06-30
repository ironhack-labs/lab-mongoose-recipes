const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipe = new Schema({
  title: {type:String, required: true}, //unique
  level: {type:String, enum:['Easy Peasy','Amateur Chef','UltraPro Chef']},
  ingredients: {type:Array},
  cousine: {type:String, required: true}, //required
  dishType: {type:String, enum:['Breakfast' , 'Dish' , 'Snack' , 'Drink' , 'Dessert' , 'Other']},
  image: {type:String, default:"https://images.media-allrecipes.com/images/75131.jpg"}, // default
  duration: {type:Number, min:0},
  creator: {type:String},
  created: {type:Date, default:Date},
});

let recipeModel = mongoose.model('recipeApp', recipe);

recipeModel.create({
    title: 'Omelete a la Heavy Metal',
    level: 'UltraPro Chef',
    ingredients: ['huevos', 'leche', 'carnitas', 'champinoes', 'cerveza', 'chile verde', 'chorizo', 'tocino'],
    cousine: 'Mexicana',
    dishType: ['Dish'],
    image: '',
    duration: 30,
    creator: 'Anonymous'
  })
  .then((recipe) => {
    console.log('ok')
  })
  .catch((err) => {
    console.log('An error happened:', err)
  });

let promise1 = recipeModel.create(data)
  .then((recipe) => { console.log('creando 5 registros')})
  .catch((err) => { console.log('An error happened:', err) });

let promise2 = recipeModel.updateOne({title: 'Rigatoni alla Genovese'}, { duration: 100 })
  .then((recipe) => { console.log('registro actualizado correctamente...')})
  .catch((err) => { console.log('An error happened: al actualizar', err) });

  // Delete the first "Alice" found
let promise3 = recipeModel.deleteOne({ title: "Carrot Cake"})
    .then((recipe) => { console.log('registro eliminado correctamente...')})
    .catch((err) => { console.log('An error happened: al eliminar', err) });

Promise.all([promise3, promise2, promise1])
  .then(values => {
    console.log("creacion de receta nueva, modifica a duration 100, eliminar Carrot Cake");
    console.log(values);
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
