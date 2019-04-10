const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  //Iteration 1
    const schema = {
      title: {type: String, unique: true, required: true},
      level: {type: String, enum:[ 'Easy Peasy' , 'Amateur Chef' , 'UltraPro Chef' ]},
      ingredients: {type: Array},
      cuisine: {type: String, required: true},
      dishType: {type: String, enum:[ 'Breakfast' , 'Dish' , 'Snack' , 'Drink' , 'Dessert' , 'Other' ]},
      image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
      duration: {type: Number, min: 0},
      creator: String,
      created: {type: Date, default: Date.now}
    }    

    const RecipeBuilder = mongoose.model('recipe', schema);

      // Iteration 2 and 3
      RecipeBuilder.insertMany(data)
      .then((success)=>{
        // Iteration 4
        console.log(data[0].title);
        return RecipeBuilder.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{duration:100})        
      })
      .then((success)=>{
        // Iteration 5
        return RecipeBuilder.findOneAndDelete({title: 'Carrot Cake'});
      })
      .then( () => {
        // Iteration 6
        mongoose.connection.close();
      })
      .catch((err)=>{
        console.log(err);
      }); 
    
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



