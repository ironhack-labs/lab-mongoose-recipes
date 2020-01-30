const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'


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
  .then(x => {

  	  }))
  .catch(err => console.error('Error connecting to mongo', err));
