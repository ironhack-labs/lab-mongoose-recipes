const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

//aquí le digo a mi esquema que me sea mandado el modelo para usarlo:
const Recipe = require('./models/recipe.js')
//esto de abajo es para conectar con mongo:
mongoose.connect('mongodb://localhost/recipeApp')

//esto: es una promesa de que si se conecta a mongo haga un drop, que es borrar la coleccion.
  .then(() => {
    console.log('Connected to Mongo!');
    return Recipe.collection.drop(); //borro la coleccion
  })

  //aqui abajo otro then concatenado con el primero, en el que creo una entrada manualmente:
  .then(() => { 
    return Recipe.create({title:"Pizza", cuisine:"Italian"})
  })
// aqui abajo cuando queramos devolver un DATO por console.log se hace así:
  .then((recipe => {console.log(recipe.title)}))
  .catch(err =>{console.log("Error al crear modelo")})

  //aqui abajo otra promesa para añadir muchos datos a la vez: data son los datos que le paso
  .then(() => {
    return Recipe.insertMany(data)////aqui te mete todas las recetas con el insertmany
  })
  .catch(err =>{console.log("Error al insertMany")})

  //aquí abajo para actualizar los campos de una promesa, primeros {} llamo a la que quiero, 
  // y los segundos  {} modifico lo que quiero:
  .then(() => {
    return Recipe.updateOne({ 
      title: 'Rigatoni alla Genovese'},
      {duration: 100})

    .then(console.log)
    .catch(err => {console.log("error al actualizar")})

  })

// aqui abajo deleteOne le digo uno que borrar:
  .then(() => {
    return Recipe.deleteOne({
      title: 'Carrot Cake'})
  })
  .catch(err => {console.log("error al eliminar")})

// aqui abajo me desconecto de moongose:
  .then(() => {
    moongose.disconect()
    .then(()=> console.log("Err Disconnect Mongo"))
  })

  
  .catch(err => {
    console.error('Error connecting to mongo', err);
  })
