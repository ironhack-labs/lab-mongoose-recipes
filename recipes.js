const mongoose = require('mongoose');
const data = require('./data.js');

const Schema   = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: Array,
  cousine: { type: String, required: true },
  dishtype: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

function init() {
  Recipe.insertMany(data)
    .then(() => {
      return Recipe.deleteOne({ title: 'Carrot Cake' });
    })
    .then(() => {
      return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
    })
    .then(() => {
      console.log('Deleted!');
      return mongoose.connection.close();
    })
    .then(() => {
      console.log('Connection closed!');
    });
}

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    init();
  })
  .catch((err) => {
    console.error('Error:', err);
  });
