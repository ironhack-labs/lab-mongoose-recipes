const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp').then(() => {
    




console.log('Connected to Mongo!')
    Recipe.insertMany(data)
   
    .then(recipes=>{console.log(recipes)})
  }).catch(err => {console.error('Error connecting to mongo', err);});

const recipeSchema = new Schema({
      title: { type: String, required: true, unique: true},
      level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
      ingredients: [],
      cousine: {type: String, required: true},
      dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', "Drink", "Dessert", "Other"] },
      image: { type: String, default: ' https://images.media-allrecipes.com/images/75131.jpg.'},
      duration: { type: Number, min: 0 },
      creator: String,
      created: { type: Date, default: Date.now    }
});





const Recipe = mongoose.model( "Recipe", recipeSchema);



Recipe.create({ title: 'Alice', cousine: 'Architect',level:"Easy Peasy", ingredients:["sugar","honey"], }, function (err, user) {
  if (err) console.log('An error happened:', err);
  else console.log('The user is saved and its value is: ', user);
});

Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(console.log("OK"))
  .catch(console.log("NO"));

    
  Recipe.deleteOne({ title: "Carrot Cake"})
  .then(console.log("OK"))
  .catch(console.log("NO"));

//.close();
