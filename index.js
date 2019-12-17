const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
let it2 = false;
let it3 = false;
let it4 = false;
let it5 = false;



// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true, socketTimeoutMS: 5000 })
.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.catch(err => {
    console.error('Error connecting to mongo', err);
  });


// ::::promise Version ::::

Recipe.create({
  title: 'Pozole',
  level: 'UltraPro Chef',
  ingredients: ['5lt Agua', '1 Kg de Carne de Cerdo', '3 Kg Maiz','5 Lechugas', '1/2 Kg Oregano','3 Kg de limones','300 gr de sal','1 cda de acite','1/2 Kg de rabanos', '300 gr de chiles'],
  cuisine: 'Mexicana',
  dishType: 'Other',
  duration: 410,
  creator: 'Le champs'})
.then(dato => { console.log('The recipe has been saved with next values: ', dato)
it2 = true })
.catch(err => { console.log('An error happened:', err) });


Recipe.insertMany(data)
.then(dato => { console.log('The user is saved with next values: ', dato) 
it3 = true })
.catch(err => { console.log('An error happened:', err) });
 // // :::::promise mix version::::
  // Recipe 
  //   //poner los campos y valores aa creae
  //   function addNewRecipie(){
  //     const rcp = new Recipe({
  //       title: 'Pozole',
  //       level: 'UltraPro Chef',
  //       ingredients: ['5lt Agua', '2 Kg de Carne de Cerdo', '3 Kg Maiz','5 Lechugas', '1/2 Kg Oregano','3 Kg de limones','300 gr de sal','1 cda de acite','1/2 Kg de rabanos', '300 gr de chiles'],
  //       cuisine: 'Mexicana',
  //       dishType: 'Other',
  //       duration: '360',
  //       creator: 'La Abuela'

  //     })
  //     rcp
  //       .save()
  //       .then(create => console.log(`A new recipie has been created: ${create}!`))
  //       .catch(err => console.log(`Error while creating a new recipie: ${err}`));
  //   }
  
  //   addNewRecipie();
  
// //  ::::Create version:::::
// Recipe.create({
//     title: 'Pozole',
//     level: 'UltraPro Chef',
//     ingredients: ['5lt Agua', '1 Kg de Carne de Cerdo', '3 Kg Maiz','5 Lechugas', '1/2 Kg Oregano','3 Kg de limones','300 gr de sal','1 cda de acite','1/2 Kg de rabanos', '300 gr de chiles'],
//     cuisine: 'Mexicana',
//     dishType: 'Other',
//     duration: '410',
//     creator: 'La Patrona'
//   }, function (err, user){
//       if (err) {
//         console.log('An error happened:', err);
//       } else {
//         console.log('The user is saved and its value is: ', user);
//       }
//         });

//Editar todas las coincidencias del registro
let query = {creator: 'Le champs'}
//Recipe.updateOne(query, {duration: 90})   //Edita la primer coincidencia
Recipe.updateMany(query, {duration: 90})
.then(dato => { console.log('The data has been UPDATED with next results: ', dato) 
it4 = true })
.catch(err => { console.log('An error happened:', err) });


//Borrar todas las coincidencias de registro
let deleteQuery = {creator: 'Chef Ardash'}
Recipe.deleteMany(deleteQuery)
.then(dato => { console.log('The data has been DELETED with next results: ', dato) 
it5 = true })
.catch(err => { console.log('An error happened:', err) });




let off = new Promise((resolve, reject) => {

  off.then (())
  resolve(it2 == true && it3 == true && it4 == true && it5 == true).then (mongoose.disconnect()) 
  { 
    console.log('Database Close')
    console.log(it2,it3,it4,it5)
  }

})


