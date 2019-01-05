const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema ({
  title : {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: {type: Array},
  cuisine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: new Date()}
});

const Recipe = mongoose.model('Recipe', recipeSchema)

Recipe.create({ title: 'Pan au Levain', level: 'Amateur Chef', ingredients: ['harina', 'água', 'sal', 'masa madre'], cuisine: 'Francesa', dishType: 'Other', image: 'https://www.ecestaticos.com/imagestatic/clipping/2cd/2f0/2cd2f0202a081965b78ec2ce106946af/asi-es-la-ley-que-pretende-acabar-con-el-fraude-del-pan.jpg?mtime=1518172601', duration: 120, creator: "unknown" })
  .then(recipe => { console.log('La nueva receta es: ', recipe) })
  .catch(err => { console.log('An error happened:', err) });

Recipe.insertMany(data)
  .then(recipe =>console.log(recipe))
  .catch(err => console.log("Nooooo!"))

Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(recipe => console.log(recipe))
  .catch(err => console.log('¿Por qué no funciona?'));

Recipe.deleteOne({ title: "Carrot Cake"})
  .then(()=>{console.log("Ya no hay zanahorias, lo siento."); 
      mongoose.connection.close()})
  .catch(err => {console.log("¿Qué pasó?")
    mongoose.connection.close()});

module.exports = Recipe;