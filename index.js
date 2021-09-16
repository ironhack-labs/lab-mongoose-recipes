// 1. IMPORTACIONES
const mongoose          = require("mongoose")
const express           = require("express")
const app               = express()


// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

app.use(express.static(__dirname + "/public"))
app.set("views", __dirname + "/views")


// Connection to the database "recipe-app"
app.get("/", (req, res) => {
  return res.render("index")
})

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.insertMany(data)
    .then(rec => {
      console.log(`${rec.length}`);
    })
    .then(() => {
    Recipe.updateOne({name: "Rigatoni alla Genovese"}, {duration:100})
    .then(() => {
        console.log("Receta actualizada")
    })
  })
    .catch((error) => {
      console.log(error)
  })
  .then(() => {
    mongoose.connection.close();
  })
    .catch(error => {
      console.error('Error connecting to the database', error);
    })
  
  })  
  
  app.get("/recetas/borrar", (req, res) => {
    Recipe.deleteOne({name: "Carrot Cake"})
    .then((data) => {
        console.log(data)
        res.send("borrado ok")
    })
    .catch(e => console.log(e)) 
  })
  


  // SERVIDOR
app.listen(3000, () => {
  console.log("El servidor está activado")
})