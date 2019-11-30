const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const Recipe = require('./models/Recipe');
const data = require('./data.js'); //Importa la informacion

//Conexción a Mongoo
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Conectado a Mongo');
  }).catch(err => {
    console.error('Error al conoctarse a Mongo', err);
  });

// 2 Create Recipe

Recipe.create ({
  title: 'torta de tamal 4',
  level: 'UltraPro Chef',
  ingredients: ['bolillo', 'tamal'],
  cuisine: 'Mexican',
  dishType: 'Dish',
  image: 'https:fotos.e-consulta.com/guajolotas.jpg',
  duration: 5,
 
});

// 3 Many
 Recipe.insertMany(data)//Inserta muchos
  .then( (recipes) => {
     recipes.forEach(function(e) {//El arreglo se vuelve el evwnto y se manipula
      console.log(e.title)//Se manda el titulo a consola de cada receta
    })
   })
  .catch(e=>console.log(e));

  // 4 Update
  
  Recipe.updateOne({cuisine: 'Italian'}, {duration:'100'})
    .then((recipe) => {console.log(recipe)})
    .catch(e=>console.log(e));

    // 5 Delete 
  Recipe.deleteOne({title: 'Carrot Cake'})
    .then((o)=>{console.log(o)})
    .catch(e=> console.log(e));

  // Elimina los que tenga en titulo la palabra tamal
  // Recipe.deleteMany({title: /tamal/})
  //   .then((u)=>{console.log(u)})
  //   .catch(e=> console.log(e));

  // 6 Cerrar la base
  mongoose.connection.close();