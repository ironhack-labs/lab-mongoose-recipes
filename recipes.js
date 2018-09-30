const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data     = require('./data.js');

mongoose.connect(`mongodb://localhost/ironhack`, {useNewUrlParser: true})
  .then(() => {
    console.log('*** Connected to Mongo! ***');
    console.log('===>');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
});

const Recipe = require('./modules/Recipe');

function create() {
  Recipe
    .create({
      title: `Atún con mayonesa`,
      level: `Easy Peasy`,
      ingredients: [`atún`, `mayonesa`, `elote`, `Valentina`],
      cousine: `Mexican`,
      dishType: `Snack`,
      duration: 10,
      creator: `Diego`
    })
    .then( recipe => console.log(recipe.title) )
    .catch( err => console.error(err) )
  ;
  Recipe
    .insertMany(data)
    .then( data => console.log(data.title) )
  ;
}
create();

function updateOne(query, change) {
  Recipe
    .updateOne({title: query}, {duration: change})
    .then( recipe => console.log(`${recipe} updated!!`) )
    .catch( err => console.log(err) )
  ;
}
updateOne(`Rigatoni alla Genovese`, 100);

function deleteOne(query) {
  Recipe
    .deleteOne({title: query})
    .then( recipe => console.log(`${recipe} deleted!!`))
    .catch( err => console.log(err) )
  ;
}
deleteOne(`Carrot Cake`);