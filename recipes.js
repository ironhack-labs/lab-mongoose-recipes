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
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: [ "Easy Peasy", "Amateur Chef", "UltraPro Chef" ]},
  ingredients: { type: Array },
  cousine: { type: String, required: true },
  dishType: { type: String, enum: [ "Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other" ]},
  image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model( "Recipe", recipeSchema );

const barszcz = new Recipe({
  title: "Barszcz",
  level: "Amateur Chef",
  ingredients: [ "beetroot", "salt", "water (a lot)", "spice", "carrot", "pepper" ],
  cousine: "Polska",
  dishType: "Dish",
  image: "https://thumbs.dreamstime.com/b/barszcz-potage-polonais-de-no%C3%ABl-21550846.jpg",
  duration: 240,
  creator: "Pan Barszcz",
  created: 1240
});

barszcz.save()
  .then(() => {
    console.log( `We've got our first ${this.title}!` );
  })
  .catch(( err ) => {
    console.log( "SHIT", err )
  });

Recipe.insertMany(data)
  .then(( each )=>{
    console.log(`${each.title}`);
  })
  .catch((err)=>{
    console.log("Error", err);
  });

Recipe.updateOne( {title: "Rigatoni alla Genovese"}, {duration: 100} )
  .then(() => {
    console.log( "SUKCES" );
  })
  .catch(( err ) => {
    console.log( "FCK", err )
  });

Recipe.deleteOne({title: "Carrot Cake"})
  .then(()=>{
    console.log(`Carrot Cake deleted`);
  })
  .catch((err)=>{
    console.log('Error',err);
  });
