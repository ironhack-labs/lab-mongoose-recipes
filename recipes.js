const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')



function getDay(){
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();
    
  if(dd<10) {
    dd = '0'+dd
  }
  if(mm<10) {
    mm = '0'+mm
  }
  return yyyy + '-' + mm + '-' + dd;
}

const recipeSchema = new Schema({
  title: String,
  level: { type:String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: Array,
  cousine: {type: String, required: true},
  dishType: {type:String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: {type: String, default:"https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: new Date(getDay())},
})

const Recipe = mongoose.model("Recipe", recipeSchema);

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    Recipe.insertMany(data, function (err, document){
      if (err) console.log('An error happened:', err);
      else {
        Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration: 100}).exec()
        .then(() => {
           Recipe.deleteOne({title: 'Carrot Cake'}).exec()
           .then(() => {
             console.log('Cierra');
             mongoose.connection.close();
           }).catch(err =>{
              console.error('Error closing mongo', err);
           })
        }).catch(err => {
          console.error('Error updating to mongo', err);
        })
    }}) 
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  