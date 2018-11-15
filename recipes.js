const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

//aquí le digo a mi esquema que me sea mandado el modelo para usarlo:
const recipeSchema = require('./models/recipe.js')
//esto de abajo es para conectar con mongo:
mongoose.connect('mongodb://localhost/recipeApp')

//esto: es una promesa de que si se conecta a mongo haga un drop, que es borrar la coleccion.
  .then(() => {
    console.log('Connected to Mongo!');
    return recipeSchema.collection.drop(); //borro la coleccion
  })

  //aqui abajo otro then concatenado con el primero, en el que creo una entrada manualmente:
  .then(() => { 
    return recipeSchema.create({title:"Pizza", cuisine:"Italian"})
  })
  //aqui abajo otra promesa para añadir muchos datos a la vez: data son los datos que le paso
  .then(() => {
    return recipeSchema.insertMany(data)////aqui te mete todas las recetas con el insertmany
  })

  //aquí abajo para actualizar los campos de una promesa, primeros {} llamo a la que quiero, 
  // y los segundos  {} modifico lo que quiero:
  .then(() => {
    return recipeSchema.updateOne({ 
      title: 'Orange and Milk-Braised Pork Carnitas'},
      {duration: 60})

  })
// aqui abajo deleteOne le digo uno que borrar:
  .then(() => {
    return recipeSchema.deleteOne({
      title: 'Carrot Cake'})
  })
// aqui abajo me desconecto de moongose:
  .then(() => {
    moongose.disconect()
  })
  
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });
