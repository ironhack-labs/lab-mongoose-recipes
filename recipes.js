const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const recipeSchema = new Schema({
  title: {type: String, unique: true,required: true},
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],required: true },
  ingredients :{type: []},
  cuisine:{type: String,required: true},
  dishType: { type: String, enum: ['Breakfast', 'Dish',' Snack','Drink','Dessert','Other'] },
  image:{type:String,default:"https:// images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number,min: 0},
  creator: {type: String},
  created: {type: Date}

 });


const Recipe = mongoose.model('Recipe', recipeSchema);





mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    
    Recipe.create({title: "Paella", level:"UltraPro Chef",ingredients:["Arroz","Verduras","Mariscos"],
    cuisine:"España",dishType: "Dish",image:"./images/paella-de-marisco-1200x683.jpg",duration:120,creator:"Nira Guerra",create: 30/01/2019})
    .then(recipe => {
        console.log('Connected to Mongo!', recipe.title);
      })
    .catch(err => {
        console.error('Error connecting to mongo', err);
       
      });


      Recipe.insertMany(data,function(error,data){})
      Recipe.updateOne({title: "Rigatoni alla Genovese"},{duration:100})
      .then(recipe => {
        console.log('Success duration!');
      })
    .catch(err => {
        console.error('Error connecting to mongo', err);
      });
       
      Recipe.findByIdAndRemove("5c51df76eced4546a2ce2da1")
      .then(recipe => {
        console.log('Success delete!');
      })
    .catch(err => {
        console.error('Error connecting to mongo', err);
      });
       
     
      mongoose.connection.close();


  }).catch(err => {
    console.error('Error connecting to mongo', err);

  });


  