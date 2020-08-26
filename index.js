const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
/* mongoose
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
  }); */

mongoose
    .connect("mongodb://localhost:27017/recipe-app", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("conectadisimos a la db 💾")
    })
    .catch(err => {
        console.error("err => ", err)
    })

//iteración 2 

const newRecipe = {
    title: 'Huaxontles',
    level: 'UltraPro Chef',
    ingredients: ['huazontles', 'panela cheese', 'chile negro', 'tomate', 'onion', 'salt'],
    cuisine: 'Mexican',
    dishType: 'Dish',
    image: 'https://3.bp.blogspot.com/-jkAJEpQkQ2A/U6w68nl6tFI/AAAAAAAAH9s/EuXXR7MsOM8/s1600/Huazontles.jpg',
    duration: 40,
    creator: 'Manu Reyes',
}
async function saveRecipe() {
    const firstRecipe = Recipe.create(newRecipe)
        .then(recipe => { console.log('Receta lista: ', recipe.title) })
        .catch(err => { console.log('Ocurrio un error:', err) });

}

saveRecipe()

// iteración 3 

async function saveMany() {
    const allRecipes = Recipe.insertMany(data)
        .then(recipes => {
            console.log('Las recetas se guardaron y sus nombres son:');
            recipes.forEach(recipe => console.log(recipe.title));
        })
        .catch(err => { console.log('Ocurrio un error:', err) });
}


saveMany()


/* async function updateRecipe(title, duration) {

    await Recipe.findOneAndUpdate({ title }, { duration })
    console.log("platillo  actualizado")

}

updateRecipe({ title: 'Rigatoni alla Genovese' }, { duration: 100 }) */


// iteración 3 


const update = Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
    .then(recipe => { console.log('Se actualizo la receta') })
    .catch(err => { console.log('Ocurrio un error:', err) });



//iteración 4

async function deleteUser(title) {
    await Recipe.deleteOne(title)
    console.log("receta borrada")
}

deleteUser({ title: 'Carrot Cake' })


// iteración 5 

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log(
            "Mongoose default connection disconnected through app termination"
        )
        process.exit(0)
    })
})