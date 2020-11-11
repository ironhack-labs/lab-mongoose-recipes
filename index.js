const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: At Localhost "${self.connection.name}"`)
    // Before adding any documents to the database, let's delete all previous entries
    // return self.connection.dropDatabase();
  })
  .then(() => {

  // Run your code here, after you have insured that the connection was made
  Recipe.create([{ title: 'Ceviche', level: 'Easy Peasy', ingredients: 'Corbina y leche de tigre', cuisine: 'Peruana', dishType:'main_course', image:'https://www.recetasderechupete.com/wp-content/uploads/2020/07/Ceviche-de-corvina.jpg', duration: 63, creator: 'Popular',}])
        .then(newRecipe => {console.log('Una nueva receta es:', newRecipe.title)
     
        Recipe.insertMany(data)
              .then(allRecipes => {allRecipes.forEach(recipe => { console.log('La nueva receta es', recipe)})
             
          Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 }}, { useFindAndModify: false})
                .then(updtRecipe => { console.log('Se ha podido actualizar', updtRecipe)
             
              Recipe.deleteOne({ title: 'Carrot Cake' })
                    .then(delRecipe => { console.log('Se ha podido eliminar', { delRecipe }), mongoose.connection.close() })})    
                
                    .catch(err => { console.log('No se ha podido eliminar', err) })})   
                .catch(err => { console.log('No se ha podido editar', err) })})
              .catch(err => { console.log('No se han podido insertar', err) })})
          .catch(err => { console.log('No se ha podido crear', err) })
  .catch(err => { console.error('Error connecting to the database', err) })