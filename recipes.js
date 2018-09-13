const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

const recipesSchema = new Schema({
  title:String,
  level: {
    type:String,
    enum: ['Easy Peasy', 'Amateur Chef','UltraPro Chef']
  },
  ingredients:Array,
  cousine:{
    type:String,
    required:true
  },
  dishType:['Breakfast','Dish','Snack','Drink','Dessert','Other'],
  image:{
    type:String,
    default:' https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration:{
    type:Number,
    min:0
  },
  creator:String,
  created:{
    type:Date,
    default:'2018-09-13'
  }
})

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  let Recipe = mongoose.model('Recipe',recipesSchema)

  Recipe.insertMany(data)
  .then(r => {
    r.forEach(element => {
      console.log(element.title)
    });
    
  })

  setTimeout(()=>{
  var query = { title: 'Rigatoni alla Genovese' };
  Recipe.update(query,{ duration: 100 },()=>{
    console.log("exitoso!")
  })},1000)

  setTimeout(()=>{
    var elim = {title: 'Carrot Cake'};
    Recipe.remove(elim,()=>{
    console.log("eliminado!")
  })},1000)

  setTimeout(()=>{
    mongoose.disconnect();
  },3000)

