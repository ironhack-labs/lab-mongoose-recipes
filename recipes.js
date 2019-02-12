const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new mongoose.Schema({
  title: String,
  level: String,
  ingredients: [String],
  cuisine: {
      type: String,
      required: true
  },
  dishType: String,
  image: {
      type: String,
      default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
      type: Number,
      min: 0
  },
  creator: String,
  created: {
      type: Date,
      default: Date.now()
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// connects to database
const conn = mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    const newRecipe = {
      title: "Chi", 
      level: "Easy",
      cuisine: "Any"
    };

    Recipe.create(newRecipe, (err, recipe) => {
      if(err) throw err;
      console.log(recipe.title);
    })

    Recipe.insertMany(data, (err) => {
      if(err) throw err;
      Recipe.find({}, {title:1}, (err, docs) => docs.forEach(doc => console.log(doc.title)));
    })

    Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100}, (err, res) => {
      console.log("Updated.");
    });

    Recipe.remove({title: "Carrot Cake"}, (err)=>{
      console.log("BoomShackalaka");
    })

    mongoose.connection.close(() => console.log('connection closed'));

  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
