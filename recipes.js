const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

//It 1
const mySchema = new Schema({
  title: String,
  level: {
    type: String, 
    enum: ["Easy Peasy", 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: Array,
  cuisine: { 
    type: String, 
    required: true 
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default:  'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: String,
  created: {
    type: Date, 
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', mySchema);

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
.then(() => {
  console.log('Connected to Mongo!');
  //It 2
  Recipe.create (
    {
      title: 'White rice',
      level: 'Amateur Chef',
      ingredients: ['1/2 cup rice', '1 cup water', 'salt to taste'],
      cuisine: 'Spanish',
      dishType: ['Dish'],
      duration: 10,
      creator: 'Chef JdeJ'
    }
  )
}).then((promise) => {
  //It 3
  console.log(`${promise} creada con éxito.`);
  return Recipe.insertMany(data);
}).then((promises) => {
  //It 4
  console.log(`Total of ${promises.length} documents inserted.`);
  return Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100});
}).then((updated) => {
  //It 5
  console.log(`Document ${updated} updated.`);
  return Recipe.deleteOne({title: "Carrot Cake"});
}).then((deleted)=>{
  console.log(`Document ${deleted} deleted.`);
}).catch(err => {
  console.error('Error connecting to mongo', err);
}).then(() => {
  mongoose.connection.close();
});