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
  .then(() => Recipe.create({ title: 'lasaña', level: 'Amateur Chef', ingredients: ['carne picada, zanahoria, pimiento verde, cebolla, diente de ajo, sal, aceite de oliva, albahaca, salsa de tomate, laminas de pasta para lasaña, queso rallado, leche entera, harina de trigo, mantequilla'], cuisine: 'en una cazuela ponemos aceite de oliva, cebolla, pimiento y las zanahorias, cuando esten en su punto le añadimos la carne y la cubrimos con la salsa de tomate. para montar la lasaña colocamos una fuente apta para horno y colocamos una capa de de pasta, una de bechamel y una de carne, repetimos la operacion hasta llegar al borde y luego horneamos por 50 min aprox', dishType: 'main_course', image: " https://images.media-allrecipes.com/images/75131.jpg ", duration: '2', creator: 'Heyling', created: 'Date.now' }))

  .then((newrecipe) => console.log(newrecipe))

  .then(() => Recipe.insertMany(data))

  .then((newrecipe) => newrecipe.forEach(elm => console.log(elm.title)))

  .then(() => Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }))

  .then(() => console.log("exito, su receta ha sido actualizada en la duracion"))

  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))

  .then(() => console.log("Se ha eliminado correctamente la receta"))

  .then(() => mongoose.connection.close())

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
