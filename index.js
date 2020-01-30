const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

 /* Iteration 2 - Create a recipe*/
const ownRecipe = {
	title:'Pollo en salsa de guajillo ',
	level:'Amateur Chef',
	ingredients:['Pollo','Chile guajillo','vinagre','Aceite de Oliva','Sal','Hojas de Laurel'],
	cuisine:'Mexicana',
	dishType:'Dish',
	image:'https://i1.wp.com/ultimasnoticias.us/wp-content/uploads/2018/04/pollo-en-adobo.jpg',
	duration:'#0 minutos',
	creator:'Ricardo Leyva Gonzalez',
}




// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err))
  .then(

  	/*iteration 2*/
  	Recipe.create(ownRecipe)
  		  .then(ownRecipe=>{ownRecipe
  		  	.forEach(el =>console.log(el))
  		  })
	/*iteration 4*/

  	Recipe.updateOne({title:'Rigatoni alla Genovese'}, {level:"UltraPro Chef"})
  		  .then(res => console.log("Se actualizó la receta"))
  		  .catch(error => console.log(error))
  	/*iteration 5*/

  	Receipe.deleeOne({
  		title:"Chocolate Chip Cookies"
  	}).then(res => console.log("Receta Borrada"))
  	  .catch(error => console.log(error))

  	/*iteration 6*/

  	  mongoose.connection.close()

  	).catch(error => console.error("Error al conectar Mongo", error))
