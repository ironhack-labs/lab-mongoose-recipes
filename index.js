
//LLAMAMOS A MONGOOSE
const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
//DONDE BUSCAR LA PAGINA
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'

//LLAMO A MI BASE DE DATOS
const data = require('./data');
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
// Connection to the database "recipe-app"
mongoose
//QUE NO SALTEN LOS WARMINGS
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

  //CREAMOS LA NUEVA RECETA SEGUN EL MOLDE QUE TENIAMOS Y LE PASAMOS LOS NUEVOS KEYS
  Recipe.create({ title: "empanadas", level: "UltraPro Chef", ingredients: ["Carne Molida", "Cebolla", "Pimiento Rojo", "Aceitunas", "Comino", "Masa"], cuisine: "Argentina", dishType: "dinner", imagen: "https://cdn2.cocinadelirante.com/sites/default/files/images/2017/08/empanadasargentinas.jpg", duration: 60, creator: "Lourdes&Sergi" })
  .then((recipe) => console.log(`This Recipe was saved ${recipe}`))
   //INSERTAR OTRAS RECETAS DESDE LA DATABASE
  
  .then(() => Recipe.insertMany(data))
      .then((dataRecipe) =>
        dataRecipe.forEach((recipes) => {
          console.log("Las recetas son:", recipes.title);
        })
      )

      //TRAEMOS LA KEY TITULO CON EL VALOR DE RIGATONI Y COMO SEGUDO PARAMETRO LE PASAMOS EL TIEMPO ACTUALIZADO, Y LE TENEMOS Q PONER NEW PARA QUE IMPRIMA LOS DOS
      Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      //NEW IMPRIME EL VALOR ACTUALIZADO
      { new: true })
      .then((recipe) => console.log("Subido con exito!",recipe))
      //borramos la key indicada
      Recipe.deleteOne({ title: "Carrot Cake" })
      .then((recipe) => console.log("Receta eliminada",recipe))

      //es la funcion de cierre para que nose sig ejecutando mi database
      .then(() =>{
        mongoose.connection.close(() => {
        console.log(
          "Database cerrada "
        );
        process.exit(0);
      })
    })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

