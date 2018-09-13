const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data = require('./data.js')

const recipesSchema = new Schema({
  title: { type: String, required: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: [],
  cousine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now }
})

const Recipe = mongoose.model('Recipe', recipesSchema);

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
    return Recipe.collection.drop();
  })
  .then(() => {
    return Recipe.create({ title: "Arepas ReinaPepiada", cousine: "Venezuelan", level: "Easy Peasy" })
  })
  .then(() => Recipe.insertMany(data))
  .then(() => Recipe.find({}, {title:1, _id:0}))
  .then(titles => {
    console.log(titles);
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100}, {new:true})})
  .then((recipe) => console.log("Duration updated" + recipe))
  .then(() => Recipe.findOneAndRemove({title:"Carrot Cake"}))
  .then(() => console.log("Carrot Cake removed"))
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

