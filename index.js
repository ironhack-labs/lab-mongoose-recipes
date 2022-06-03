const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model.js');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose.connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  //2.- Nueva Receta 
  .then(()=>{
  const nuevaReceta= {
    title:"Pollo con mole",
    level:"Principiante",
    ingredients:["pollo","mole","chiles","bolillo","caldo de pollo"],
    image:"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F21%2F2017%2F05%2F11%2Fpollo-en-mole-rojo-f-cil.jpg-2000.jpg&q=60",
    duration:60,
    creator:"Doña Maria",
    create:30
  }
    return Recipe.create(nuevaReceta)
  })

  .then (result => console.log(`La nueva receta es ${result.nuevaReceta}`))

  //3.- Multiples Recetas 

  .then(()=> Recipe.insertMany(data))
  .then((newRecetas) => { console.log("Muchas recetas",newRecetas)  })
    // Run your code here, after you have insured that the connection was made



//4.- Actualizar Receta 
.then(()=> Recipe.findOneAndUpdate({duration:220},{duration:100},{new:true}) )
.then((upate)=>{console.log(`La receta esta actualizada`,upate)})


//5. Eliminar una receta 
.then(()=> Recipe.deleteOne({title:"Carrot Cake"}))
.then((remove)=>{console.log("La receta fue elminada",remove)})



//6.- Cerrar la base de datos

.then (()=>
mongoose.disconnect()
)

.catch(error => {
  console.error('Error connecting to the database', error);
});