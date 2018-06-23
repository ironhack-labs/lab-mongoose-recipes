const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipe = new Schema({
  title: String,
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: Array,
  cousine: {type:String,required:true},
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {type:Number,min:0},
  creator: String,
  created: {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipe);

const firstRecipe = {
  title:"First Dish",
  level:"Easy Peasy",
  ingredients:["pasta","tomoato sause", "chicken"],
  cousine:"Scotish",
  dishType:"Dish",
  duration:30,
  creator:"Sean"
}

Recipe.create(firstRecipe).then(recipe=>{
  console.log("Dish Title: ", recipe.title)
})

Recipe.create(data, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${data.length} recipes.`)
  mongoose.connection.close()
});

Recipe.remove({title:"Carrot Cake"}).then(data=>{
  console.log("Carrot Cake was removed");
  mongoose.disconnect()
})
