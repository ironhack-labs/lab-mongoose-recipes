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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe
          .create({ title: 'Pascualina', level: 'Amateur Chef', ingredients: ['harina', 'huevos', 'aceite', 'agua', 'espinacas', 'cebolla', 'pimiento', 'sal', 'pimienta', 'salsa bechamel', 'nueces',], cuisine: 'Uruguayan', dishType: 'snack', image: 'https://elgourmet.s3.amazonaws.com/recetas/share/tarta_qZEDFgPHQsGelh37irYd1njc0M9BWy.png', duration: 60, creator: 'Panda',})
          .then(newRecipe => console.log('La nueva receta es', newRecipe))
          .catch(err => console.log('ERROooooor ', err))

    Recipe
          .create(data)
          .then(theNewRecipe => {
            theNewRecipe.forEach(elm => console.log(`Esta receta se titula ${elm.title}`))
            return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration: 100},{new:true})
          })
          .then(reciepe => {
            console.log(reciepe)
            return Recipe.deleteOne({title:'Carrot Cake'})
          })
          .then(deleteRecipe => {
            console.log('Se ha elimiado', deleteRecipe)
            mongoose.connection.close()})
          
          .catch(err => console.log('ERROoooooor ', err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

