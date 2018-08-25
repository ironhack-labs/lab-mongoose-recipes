const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');

mongoose
  .connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

const recipeSchema = new Schema({
  title: { type: String, required: true },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },
  ingredients: { type: Array },
  cousine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'],
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg',
  },
  duration: { type: Number, min: 0, max: 100 },
  creator: { type: String },
  created: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({ title: 'Eggs', cousine: 'notsurewhatitis' })
  .then(Recipe => {
    console.log('The user is saved and its value is: ', Recipe);
  })
  .catch(err => {
    console.log('An error happened:', err);
  });

Recipe.create({
  title: 'Eggs',
  level: 'UltraPro Chef',
  cousine: 'le chef pro',
})
  .then(Recipe => {
    console.log('The user is saved and its value is: ', Recipe);
  })
  .catch(err => {
    console.log('An error happened:', err);
  });

Recipe.insertMany(data, function(error, docs) {});

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => console.log('success adding duration 100'))
  .catch(() => console.log('error ading duration 100'));

Recipe.deleteMany({ title: 'Carrot Cake' })
  .then(() => {
    mongoose.connection.close();
    console.log('success removing Carrot Cake');
  })
  .catch(() => console.log('errorr removing CC'));

app.listen(3000);
