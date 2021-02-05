// 1. Importaciones

const mongoose = require('mongoose');
const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

// 3. Middleware

app.set("views", path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'hbs')

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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// 4. Rutas

// app.get('/recipe', async() => {
//   let theRecipe = {
//     "title": "Fajitas de pollo",
//     "level": "Amateur Chef",
//     "ingredients": [
//       "2 pechugas de pollo en rebanadas o fajitas medianas",
//       "1 cebolla blanca chica fileteada",
//       "1 pimiento morrón verde en bastones",
//       "1 pimiento morrón naranja amarillo o rojo, en bastones",
//       "2 cucharadas aceite de oliva",
//       "Sal y pimienta negra al gusto",
//       "Limones para servir",
//       "Tortillas de maíz o harina para servir",
//       "Guacamole o aguacate para servir"
//     ],
//     "cuisine": "Mexican",
//     "dishType": "main_course",
//     "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
//     "duration": 30,
//     "creator": "Un chef"
//   }
//   let recipe = await Recipe.create(theRecipe)
//   console.log(recipe)
// })

// app.get('/manyrecipes', async() => {
//   let manyrecipes = await Recipe.insertMany(data)
//   manyrecipes.map((element) => {
//     console.log(element.title)
//   })
// })

// app.get('/recipeupdate', async() => {
//   let recipeupdate = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
//   console.log(`${recipeupdate} is updated`)
// })

// app.get('/recciperemove', async() => {
//   let reciperemove = await Recipe.deleteOne({title: 'Carrot Cake'})
//   console.log(reciperemove)
// })

  // 5. Levantamiento

  app.listen(3000, () => {
    console.log('Conectado al servidor')

})