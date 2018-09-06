const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipeSchema = new Schema({
    title: {type: String, required: true, unique:true},
    level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: [String],
    cousine:{type: String, required: true},
    dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image: {type: String, default:"https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {type: Number, min: 0},
    creator: String,
    created: { type: Date, default: Date.now },
})

const Recipe = mongoose.model('Recipe', recipeSchema );

// // *-*-  add just one recipe -*-*- 
//  Recipe.create({
//     title: 'Caldo con arepa',
//     level: 'Easy Peasy',
//     ingredients: ['potatoes', 'scalions', 'garlic', 'cilantro'],
//     cousine:'Colombian',
//     dishType: 'Breakfast',
//     })
//     .then((response)=>{
//         console.log('0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o',response)

//     })
//     .catch((err)=>{
//         console.log('=-=-=-=-=-=-=-=-=-=-=',err)

// })
// Recipe.create(array of recipes) OR Recipe.create(single object)
// Recipe.insertMany(data)
//     .then((response)=>{
//         console.log('0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o',data, response)
//     })
//     .catch((err)=>{
//       console.log('=-=-=-=-=-=-=-=-=-=-=',data,err)
// })

// Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
// .then((response)=>{
//         console.log('0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o',data, response)
//     })
//     .catch((err)=>{
//       console.log('=-=-=-=-=-=-=-=-=-=-=',data,err)
// })

Recipe.deleteOne({ title: "Carrot Cake"})
.then((response)=>{
        console.log('0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o',data, response)
    })
    .catch((err)=>{
      console.log('=-=-=-=-=-=-=-=-=-=-=',data,err)
})