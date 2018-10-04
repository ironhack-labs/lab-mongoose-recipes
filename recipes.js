const mongoose = require('mongoose');
//const Schema   = mongoose.Schema;
const data = require('./data.js')

const Recipe = require ('./models/Recipe');




mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Conectado a Mongo!')
  }).catch(err => {
    console.error('Error conectando a Mongo', err)
  });

function create(){
    Recipe.create({
        title: 'Huevo con ejote',
        level: 'Amateur Chef',
        ingredients: ['4 huevos', '1/2 taza de ejote'],
        cuisine: 'Mexican',
        dishType: ['Breakfast'],
        image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
        duration: 5,
        creator: 'Betsy'
    })
        .then((huevos) => {
            console.log( `${huevos} saved`)
    })
        .catch(err => {
            console.log(err);
        });
}

function insertData(){
    Recipe.insertMany(data)
        .then((data) => {
            console.log( `${data} saved`)
        })
        .catch(err => {
            console.log(err);
        });
}


function ajustarTiempo (query, cambio) {
    Recipe.updateOne({title: query}, {duration: cambio})
        .then( recipe => console.log( `${recipe} ajustado`))
        .catch(err => {
            console.log(err);
        });
}

function borrarUno (query){
    Recipe.deleteOne({title: query})
        .then( recipe => console.log (`${recipe} borrada`))
        .catch (err => console.log (err));

}

connection.end();

// borrarUno ('Carrot Cake');
// ajustarTiempo ('Rigatoni alla Genovese', 100);
//insertData();
//create();