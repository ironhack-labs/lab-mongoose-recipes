const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost:27017/recipes')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipesSchema = new Schema({
    title:String,
    level:String,
    ingredients:Array,
    cousine:String,
    dishType:String,
    image:String,
    duration:Number,
    creator:String,
    created:Date
})

const Recipes = mongoose.model('Recipes', recipesSchema);

Recipes.create({
  title: 'Pizza',
  level: 'Chingon',
  ingredients: ['Queso','Pan'],
  cousine:'French',
  dishType:'Fast Food',
  image:'Foto',
  duration:30,
  creator:'Un Frances',
  created:'12/12/2012'
})
.then((recipes) => {console.log(recipes.title)})
.catch((err) => {console.log(err)})

Recipes.insertMany(data)
.then((recipes) =>{
  recipes.forEach((e)=>{
    console.log(e.title)
  })
})

Recipes.updateOne({title:"Rigatoni alla Genovese"},{duration:100})
.then((recipes) =>{
  console.log("SUCCESS!")
})
.catch((err) => {console.log(err)})

Recipes.deleteOne({ title:"Carrot Cake"})
.then((recipes) =>{
  console.log("Remove Success")
})
.catch((err) => {console.log(err)})

