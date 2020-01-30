const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then( async (x) => {
    console.log(`Conected to Mongo! DB name: ${x.connections[0].name}`)

    //iteracion 2
      let recipe = await Recipe.create({
      title: 'Pesto',
      level: 'Amateur Chef',
      ingredients: ['3/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
      cuisine: 'Asian',
      dishType: 'Dish',
      image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
      duration: 40,
      creator: 'Chef LePapu'
    })
    console.log(`Created ${recipe}`)

    //Iteracion 3 Mnay create
    let recipes = await Recipe.create(data)
    console.log(`Created many: ${recipes}`)

    //Iteracion 4 Update mochones
    let updated = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{duration: 100},{new :true})
    console.log('Updated Object', updated)

    //Iteracion 5 remove recipe
    let deleteDoc = await Recipe.deleteOne({name: 'Carrot Cake'})
    console.log(`Deleted Element ${deleteDoc}`)

    //Cerrar base de datos Iteracion 6
    mongoose.connection.close()

  })
  .catch(err => console.error('Error connecting to mongo', err));

