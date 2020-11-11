const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

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
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({
      title: "Carbonara",
      level: "Peasy",
      ingredients: ["pasta", "eggs", "bacon", "parmesano"],
      cuisine: "ITA",
      dishType: "main_course",
      image: "https://www.pequerecetas.com/wp-content/uploads/2018/01/pasta-carbonara-receta.jpg",
      duration: 30,
      creator: "Alicia Rojo"

      })
      .then(theRecipe=>{
        console.log(theRecipe.title)  
        Recipe
          .create(data)
              .then(newRecipes => {
              newRecipes.forEach(recipe => console.log(recipe.title))
              Recipe
                .findOneAndUpdate({ duration: 220 }, { duration: 100 },{new:true})
                .then(changes => {
                  console.log("changes:", changes)
                  Recipe
                    .deleteOne({ title: "Carrot Cake" })
                    .then(deleted => {
                      console.log(deleted)
                      mongoose.connection.close()
                    })
                   .catch(err => console.log('Hubo un error', err))
                  })
                .catch(err => console.log('Hubo un error', err))

               })
              .catch(err => console.log('Hubo un error', err))
          })
        .catch(err => console.log('Hubo un error', err))
    })
  .catch (err => console.log('Hubo un error', err))
  


