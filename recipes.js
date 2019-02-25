//Mandatory
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

//connect with database
mongoose.connect('mongodb://localhost/recipeApp', {useNewUrlParser: true}, function(err){
    if(err) console.log("ERROR",err);
    else console.log("connected");
});

//Iteration 1: Create a recipe Schema
//check in mongo shell => use recipeApp => db.recipes.find()
const recipeSchema = new Schema ({
  //create new Schema 
  //required true, unique true (set value unique)
    title:        {type: String, required: true, unique: true},
    level:        {type: String, enum:['Easy Peasy' , 'Amateur Chef', 'UltraPro Chef']},
    ingredients:  {type: Array},
    cuisine:      {type: String, required: true},
    dishType:     {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image:        {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration:     {type: Number, min: 0},
    creator:      {type: String},
    created:      {type: Date, default: Date.now},

});
  
//Asign database model to Recipe
const Recipe = mongoose.model('Recipe', recipeSchema);
// //export 
module.exports=Recipe;

//Iteration 2: Create one recipe for test
Recipe.create({
  
    title:        'Asian Glazed Chicken Thighs',
    level:        'Amateur Chef',
    ingredients:  ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
    cuisine:      'Asian',
    dishType:     ['Dish'],
    image:        'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration:     40,
    creator:      'Chef LePapu'
  
})
    .then(recipe => { console.log('Recipe saved: ', recipe);})
    .catch(err => { console.log('error',err);});
      // console.log('Recipe' + recipeSchema.title);

//Iteration 3: Insert a many recipe from data.js
Recipe.insertMany(require('./data.js'));
  

//Iteration 4: Update a recipe
Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then(() => { console.log('update!');})
  .catch(err => { console.log('error:', err);});

//Iteration 5: Remove a recipe
Recipe.deleteOne({title:'Carrot Cake'})
  .then(() => { console.log('bye bye carrot!');})
  .catch(err => { console.log('error:', err);});

//Iteration 6: Close the database
process.on('SIGINT', () => { mongoose.connection.close(() => { console.log('Close'); process.exit(0);});});  

//mongoose.disconnect();