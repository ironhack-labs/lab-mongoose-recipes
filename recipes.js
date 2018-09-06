const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipeSchema = new Schema ({
    title: {type: String, required: true, unique: true},
    level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: Array,
    cousine: {type: String, required: true},
    dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, min: 0},
    creator: String,
    created: {type: Date, default: Date.now}
  })

  const recipe = mongoose.model('Recipe', recipeSchema)

  recipe.create(
[data[4]]
  )
  .then((response)=>{


    console.log(response)
  })

  .catch((err)=>{


    console.log(err)
  })

  recipe.updateOne({ title: 'Rigatoni alla Genovese'}, { duration: 100 })
  .then((response)=>{

    console.log(response)
  })

  .catch((err)=>{


    console.log(err)

  })


recipe.deleteOne({ title: 'Carrot Cake'})

.then((response)=>{
  console.log(response)
  console.log("Item was successfully deleted!")
})

.catch((err)=>{


  console.log(err)
})