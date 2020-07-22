//Requerimos mongoose.
const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

//La URL de nuestra base de datos.
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    //Metimos la funcion que definimos mas abajo con todas las operaciones que hicimos. 
    Promises();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  
//Iteracion 1. Agregamos una nueva receta.
  let newRecipe = { title: 'Pasta', 
                    level: 'Easy Peasy', 
                    ingredients: ['pasta', 'salsa'], 
                    cuisine: 'italian', 
                    dishType: 'main_course', 
                    duration: 15,
                    creator: 'Chef Luis',
                  }

//Creamos unfion asincrona que incluye varias promises, para hacerlas por orden
//Una vez acaba una, empieza la otra. 
async function Promises(){
  //Hacemos un try/catch para ver si hay errores en las promises.
  try{
    //Se anade la primera receta.
    let promise1 = await Recipe.create(newRecipe)
    //Se anade los datos del data.json que tiene multiples entradas.
    let promise2 = await Recipe.insertMany(data)
    //Actualizamos la duracion de ese plato.
    let promise3 = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
    //Eliminamos la receta.
    let promise4 = await Recipe.deleteOne({title: 'Carrot Cake'})
  
    //Ordenamos las promesas segun el orden que queremos que se cumplan.
    Promise.all([promise1, promise2, promise3, promise4])
    //Si tiene exito, mostramos estos mensajes. 
    .then((results) => {
      console.log(`A new recipe by ${results[0].creator}`);
      results[1].forEach(recipe => console.log(recipe.title));
      console.log(`${results[2]}`);
      console.log('Was deteled');
      
      //Cerramos la base de datos. 
      mongoose.connection.close()
    })
    //Si encuentra un error, nos muestra un mensaje con él.
    .catch((err) => console.log(err));}
  catch(error) {
    console.log(error);
  }
} 