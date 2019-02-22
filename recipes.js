const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
mongoose.set('useFindAndModify', false);

const Recipes = require('./models/recipes')
const data = require('./data.js')

Recipes.create({
  title: 'Asian Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Asian',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
}, (err, newRec) => {
  if (err) console.log(err)
  else {
    console.log("Single Recipe created with Model.create()")
    console.log(newRec._doc.title)
  }
})

Recipes.insertMany(data, (err, allRec)=>{
  if (err) console.log(err)
  else {
    console.log("Added Recipes with Model.insertMany:")
    allRec.forEach(recipe => {
      console.log(recipe.title);
    });
  }
});

Recipes.findOneAndUpdate({title: 'Rigatoni alla Genovese' 
}, {duration: 100}, {
  new: true
}, function (err) {
  if (err) console.log(err)
  else {
    console.log("succesfully updated duration time");
  }
});

Recipes.findOneAndRemove({title: "Carrot Cake"}, (err) => {
  if (err) console.log(err)
  else console.log("Successfully removed Carot Cake")
}) 

mongoose.connection.close()