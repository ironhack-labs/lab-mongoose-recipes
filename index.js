const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const huevito = {
	"title":"huevito con catsup",
	"level":"Amateur Chef",
	"ingredients": [
	"2 huevitos",
	"sal",
	"catsup"
	],
	"cuisine":"Mexican",
	"dishType":"breakfast",
	"image":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.buzzfeed.com%2Fmx%2Fcrystalro%2Fque-tan-raros-son-tus-gustos-en-comida&psig=AOvVaw2PEjHNSG_QmZlZbJ9YTHUQ&ust=1654491206042000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLCMjZfClfgCFQAAAAAdAAAAABAD",
	"duration": 30,
	"creator":"mexican power"
}
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany() //==> Comentado para la iteracion 4
  })
  .then(() => {
	  //ITERACION 2: 
	  Recipe.create(huevito)
            .then(console.log('Se ha actualizado la base de datos'))
	//ITERACION 3: 
	  Recipe.insertMany(data)
	//ITERACION 4 
	Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100})
	//ITERACION 5 
	Recipe.deleteOne({title:'Carrot Cake'})

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


Recipe.find({title:{$exists:true}},{title:1})
  .then(titulos=>console.log('Los titulos son: ',titulos))
  .catch(error=>console.log("Surgio un error: ",error))

