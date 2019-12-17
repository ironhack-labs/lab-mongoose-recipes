const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
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
  duration: '410',
  creator: 'Le champs'
})
.then(dato => { console.log('The recipe has been saved with next values: ', dato) })
.catch(err => { console.log('An error happened:', err) });


Recipe.insertMany([{
  title: 'Huevos Benedictinos',
  level: 'UltraPro Chef',
  ingredients: ['5 huevos', '1 lt de Agua', '100 ml de Vinagre blanco', '5 panes tostados','Salsa Holandesa','10 gr de sal'],
  cuisine: 'Mexicana',
  dishType: 'Breakfast',
  duration: '45',
  creator: 'Chef Ardash'},
  {title: 'Chicharron en salsa Verde',
  level: 'Easy Peasy',
  ingredients: ['1lt Agua', '1 Kg de Chicharron', '2 Kg tomate verde', '5 Chiles', '1 Kg de Tortillas','3 cebollas', '1 cda de sal'],
  cuisine: 'Mexicana',
  dishType: 'Other',
  duration: '40',
  creator: 'Chef Ardash'},
  {title: 'Lentejas',
  level: 'Amateur Chef',
  ingredients: ['1lt Agua', '1 Kg de lentejas', '2 Kg jitomate', '1 cda de sal'],
  cuisine: 'Mexicana',
  dishType: 'Other',
  duration: '35',
  creator: 'Chef Kaflo'}])
.then(dato => { console.log('The user is saved with next values: ', dato) })
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

