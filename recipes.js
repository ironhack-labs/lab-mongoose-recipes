const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const RecipeSchema = {
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: Array,
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
}


const recipe = mongoose.model('Recipe', RecipeSchema);


  // recipe.create([data[1], data[2], data[3], data[4]])
  //   .then((response)=>{
  //       console.log(response)
  //   })
  //   .catch((err)=>{
  //       console.log(err)
  //   })


    
    // recipe.findByIdAndUpdate('5b91561c19fe2a1db6964dd6', {duration: 100})
    // .then((response)=>{
    //     console.log(response)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })


    recipe.findByIdAndRemove('5b9158be4f94ba1f9d651422')
    .then((theThingIGetBack)=>{
        console.log(theThingIGetBack)
     })
    .catch((theErrorThing)=>{
        console.log(theErrorThing)
    })


    // recipe.deleteOne({title: 'Carrot Cake'})
    // .then((response)=>{
    //     console.log(response)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })
