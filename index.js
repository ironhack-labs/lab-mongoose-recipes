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
  .then(() => Recipe.create({ title: 'Arepas', level: 'Easy Peasy', ingredients: ['harina de maiz, agua, sal'], cuisine: 'Venezuela', dishType: 'breakfast', duration: 1, creator: 'Heyling Marquez' }))

  .then((newrecipe) => console.log(newrecipe))

  .then(() => Recipe.insertMany(data))

  .then((newrecipe) => newrecipe.forEach(elm => console.log(elm.title)))

  .then(() => Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }))

  .then(() => console.log("exito, su receta ha sido actualizada en la duracion"))

  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))

  .then(() => console.log("Se ha eliminado correctamente la receta"))

  .then(() => mongoose.connection.close())

  .then(() => console.log("Hasta Pronto...."))

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

