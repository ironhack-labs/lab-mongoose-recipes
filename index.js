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
    Recipe
        .create({
          title: 'Quiche de cuatro quesos con nueces',
          level: 'Easy Peasy',
          ingredients: ['Masa','leche','huevos','queso azul','mozzarella','queso de oveja', 'queso de untar','nueces','sal','pimienta'],
          cuisine: 'receta de aprovechamiento',
          dishType: 'other',
          image: 'https://s2.eestatic.com/2015/01/26/cocinillas/Cocinillas_6259509_116056486_1706x960.jpg',
          duration: 15,
          creator: 'Juan Antonio López',
          created: 23-04-1989
        })
        .then(newRecipe => console.log('El título de la receta creada es:', newRecipe.title))
  })

  .then(() => 

    Recipe
        .create(data)
        .then(newRecipes => newRecipes.forEach(element => {
          console.log(element.title)
        }))
  )

  .then(() => 

    Recipe
        .findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
        .then(updatedRecipe => console.log(updatedRecipe))

  )

  .then(() =>
        Recipe
            .deleteOne({title: 'Carrot Cake'})
            .then(console.log('Borrado con éxito!'))
  )

  .then(() => mongoose.connection.close())

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

