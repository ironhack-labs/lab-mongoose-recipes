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
		useUnifiedTopology: true,
	})
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`);
		// Before adding any documents to the database, let's delete all previous entries
		return self.connection.dropDatabase();
	})
	.then(iteration2)
	.catch((error) => {
		console.error('Error connecting to the database', error);
	});

function iteration2() {
	//Iteration 2
	Recipe.create({
		title: 'Arroz con bacon',
		level: 'Easy Peasy',
		ingredients: [
			'arroz',
			'cebolla',
			'bacon',
			'ajo',
			'pimienta negra',
			'perejil',
		],
		cuisine: 'Vitrocerámica o gas',
		dishType: 'main_course',
		duration: 30,
		creator: 'Maria  Jesús Urrutia Jiménez',
	})
		.then((rec) => {
			console.log(rec.title);
			iteration3();
		})
		.catch((err) => console.log('Error ocurrido durante la inserción: ', err));
}
function iteration3() {
	//Iteration 3
	Recipe.insertMany(data)
		.then((recs) => {
			recs.forEach((rec) => console.log('Recipe Title: ', rec.title));
			iteration4();
		})
		.catch((err) => console.log('Error ocurrido durante la inserción: ', err));
}
function iteration4() {
	//Iteration 4
	Recipe.findOneAndUpdate(
		{ title: 'Rigatoni alla Genovese' },
		{ duration: 100 }
	)
		.then((rec) => {
			console.log('Receta actualizada!!');
			iteration5();
		})
		.catch((err) =>
			console.log('Error ocurrido durante la actualización: ', err)
		);
}
function iteration5() {
	//Iteration 5
	Recipe.deleteOne({ title: 'Carrot Cake' })
		.then((rec) => {
			console.log('Receta eliminada!!');
			iteration6();
		})
		.catch((err) =>
			console.log('Error ocurrido durante la eliminación: ', err)
		);
}
function iteration6() {
	mongoose.connection.close().then(console.log('Conexión cerrada'));
}

process.on('SIGINT', function () {
	mongoose.connection.close(() => {
		console.log('Cierre conexion por fin de la aplicación');
		process.exit(0);
	});
});
