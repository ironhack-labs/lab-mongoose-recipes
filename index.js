const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

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
    // Run your code here, after you have insured that the connection was made

    async function controlador(){
      create()
      await
      agregar(data)
      await
      actualizar()
      await
      borrar()
      await mongoose.connection.close()
    }
    controlador()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  async function create() {
    const newReceta = await Recipe.create({
      title: "Paella",
      level: "UltraPro Chef",
      ingredients: ["Pollo", "Arroz", "Azafran"],
      cuisine: "Española",
      dishType:"main_course",
      image: "paella",
      duration: 40,
      creator: "Alba Mulero"
    })
  }

  async function agregar(data) {
    const newAgregar = await Recipe.insertMany(data)
    //console.log(newAgregar)
    newAgregar.forEach(element => {
      console.log(element.title)
    });
  }

  async function actualizar(){
    const filtro = {title:"Rigatoni alla Genovese"}
    const cambio = {duration: 100}
    const newActualizar = await Recipe.findOneAndUpdate(filtro, cambio, {new:true})
    console.log("Exitoso")
  }

  async function borrar(){
    const filtro = {title:"Orange and Milk-Braised Pork Carnitas"}
    const newBorrar = await Recipe.deleteOne(filtro)
    console.log("Se borro")
  }


  
