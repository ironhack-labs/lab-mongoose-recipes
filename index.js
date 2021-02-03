const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { model } = require('./models/Recipe.model');

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
  .then(() => {   //gracias a escribir la funcion asi me ha sido mas facil!!!!
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Pizza di manzo, zucchine e melanzane",
      level: "UltraPro Chef",
      ingredients: [
        "para una masa espectacular, lo siento el chef no revela su secreto, busque cualquiera en google",
        "2 calabacines pequeños cortados en juliana",
        "1 berenjena pequeña, en rodajas finas",
        "una pizca de sal",
        "90ml de aceite de oliva",
        "1 cebolla pequeña muy picada",
        "1 diente de ajo muy picado",
        "1 zanahoria pequeña, picada",
        "1 tallo de apio, finamente picado",
        "250 g de ternera picada",
        "60ml de vino blanco seco",
        "90ml de caldo de res",
        "2 cucharadas de concentrado de tomate",
        "pimienta negra recién molida"
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 140,
      creator: "Chef Caballero",
      created: new Date(2021 - 2 - 3),
    })

      .then((recipe) => { console.log(recipe.title) })

      .then(() => {
        Recipe.insertMany(data)
          .then((recipes) => {
            recipes.forEach(recipes => {
              console.log(recipes.title)
            })
            Recipe.findOneAndUpdate(
              { title: "Rigatoni alla Genovese" }, { duration: 100 })
              .then(() => {
                console.log("Rigatoni alla Genovese duration is update")
              })

            Recipe.deleteOne({ title: "Carrot Cake" })
              .then(() => {
                console.log("Carrot Cake was deleted")
                moongose.disconnect() //esto me lo han chivado...
              })
          })
      })
  })
  .catch (error => {
  console.error('Error connecting to the database', error);
});
