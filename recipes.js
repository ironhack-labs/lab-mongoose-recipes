const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const schemaRecipe = new Schema({
  title: {type: String, required: true, unique:true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients:{type:[String]},
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
});
  
var Recipe = mongoose.model('Recipe',schemaRecipe);
  
Recipe.create({title:'Papa rellena', 
              level: 'Easy Peasy', 
              ingredients: 'Papa, alambre de res, queso',
              cousine: 'Hierve la papa hasta que esté cocida, luego ábrela y rellena con el alambre. Decora con queso y llévala al horno por 30 minutos.', 
              dishType:'Dish', 
              image: 'https://www.asaderobajasonora.com/wp-content/uploads/2016/01/Papa-2000x1338.jpg',
              duration: 60, 
              creator: 'Hugo'})
  .then((recipe) => { console.log('The Recipe´s title is: ', recipe.title) })
  .catch((err) => { console.log('Error:', err) });
  
  
Recipe.insertMany(data)
  .then((recipe) => { console.log('All recipes saved: ');
      recipe.forEach((rec, ind)=>{ console.log(" *"+(ind+1)+" "+rec.title)});
      Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
        .then(()=>{console.log("Recipe updated!!!");
          Recipe.deleteOne({title: 'Carrot Cake'})
            .then((deletedRecipe) => { console.log('Deleted recipe: ', deletedRecipe);
              mongoose.connection.close()})
            .catch((err) => { console.log('Error:', err) });
        })
        .catch((err) => { console.log('Error:', err) });
        })
  .catch((err) => { console.log('Error:', err) });