const mongoose = require('mongoose');
const Recipe = require('./Recipe')
const data = require('./data.js')


//CEATE
// Recipe.create({
//   title: 'Chupelupe',
//   level:'UltraPro Chef',
//   ingredients: ['dulce','azucar','glucosa','edulcorantes'],
//   cousine: 'MEXICANISIMA',
//   disType:'Snack',
//   duration:1,
//   creator: 'Los Richards',
// })
// .then(recipe=>console.log('creado'))
// .catch(err=>console.log('ya valio'))



// READ



//UPADATE
// Recipe.findByIdAndUpdate('5b3e541c7e291060eedc2aaa', {duration: 100})
// .then(recipe=>console.log('modificado'))
// .catch(err=>console.log('ya valio'))

//DELETE
Recipe.findByIdAndRemove('5b3e541c7e291060eedc2aa9')
.then(recipe=>console.log('Carrot Cake Eliminado'))
.catch(err=>console.log('ya valio'))





mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

