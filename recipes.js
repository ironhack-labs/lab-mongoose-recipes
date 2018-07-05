const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema({
  title: {type:String, required: true, unique: true},
  level: {type:String, enum:['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: [String],
  cousine: {type: String, required: true},
  dishType: {type: String, enum:['Breakfast','Dish','Snack','Drink','Dessert','Other' ]},
  image: {type:String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type:Number, min:0},
  creator: String,
  crerated: {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema );

// iteration 2
const createRecipe = function(infoObject) {
return Recipe.create(infoObject, (err, recipe ) => {
 if (err) {
   console.log(err)
 } else {
   console.log(recipe.title,'Recipe added successfully')
 }

});
};

// createRecipe( title: 'foo', level:'Easy Peasy', ingredients:['Apple','Bread'], cousine: 'French'})
// iteration 3
const insertRecipes = function (recipesArray){
return Recipe.insertMany(recipesArray,(err,result )=>{
  if (err) {
    console.log(err)
  } else {
    console.log('Recipe added successfully');
    Recipe.find({}, (err,recipe) => {
      recipe.forEach((item)=> {
       console.log(item.title)
      });
})
  }
})
}

// insertRecipes(data);


// i3 option 2 monsitas way
//  Recipe.insertMany(data)
//  .then((data) => {

//    data.forEach(function(item){
//      console.log('The title of the recipe is: ' + item.title)
//    })
   

//  })


// iteration 4

const updateRecipe = function (query, update){

return Recipe.updateOne(query, update)
 .then(()=> {
   console.log('Update success')
 })
 .catch((err)=> {
   console.log(err)
 });
}

updateRecipe({title: 'Rigatoni alla Genovese'}, {duration: 100});

 //iteration 5

 const deleteRecipe = function (query) {
return Recipe.deleteOne()
 .then(()=> {
  console.log('Delete success')
})
.catch((err)=> {
  console.log(err)
});
}

deleteRecipe({title:'Carrot Cake'})

// iteration 6

mongoose.connection.close()

mongoose.disconnect()



 




