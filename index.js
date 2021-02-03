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
  //ITERACION 2
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Asian Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      cuisine: "Asian",
      dishType: "main-course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu",
      created: new Date('02-02-2020')
    })
  })
  //ITERACIÓN 3, SIN INSERTMANY PORQUE NO ME SALÍA
  .then(newRecipe => {
    return Recipe.create({
      title: "Chocolate Chip Cookies",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup light brown sugar",
        "1 large egg",
        "2 tablespoons milk",
        "1 1/4 teaspoons vanilla extract",
        "2 cups semisweet chocolate chips"
      ],
      cuisine: "French",
      dishType: "dessert",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu",
      created: new Date('02-02-2020')
    })

  }).then(newRecipe => {
    return Recipe.create({
      title: "Rigatoni alla Genovese",
      level: "Easy Peasy",
      ingredients: [
        "2 pounds red onions, sliced salt to taste",
        "2 (16 ounce) boxes uncooked rigatoni",
        "1 tablespoon chopped fresh marjoram leaves",
        "1 pinch cayenne pepper",
        "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
      ],
      cuisine: "Italian",
      dishType: "other",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 220,
      creator: "Chef Luigi",
      created: new Date('02-10-2021')
    })

  })
  .then(newRecipe => {
    return Recipe.create({
      title: "Carrot Cake",
      level: "Amateur Chef",
      ingredients: [
        "6 cups grated carrots",
        "1 cup brown sugar",
        "1 cup raisins",
        "4 eggs",
        "1 1/2 cups white sugar",
        "1 cup vegetable oil",
        "2 teaspoons vanilla extract",
        "1 cup crushed pineapple, drained",
        "3 cups all-purpose flour",
        "1 1/2 teaspoons baking soda",
        "1 teaspoon salt",
        "4 teaspoons ground cinnamon"
      ],
      cuisine: "International",
      dishType: "dessert",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 130,
      creator: "Chef Nadia",
      created: new Date('02-04-2019')
    })
    // ITERACIÓN 4
  })
  .then(() => {
    //El método findOneAndUpdate me salía como deprecated, usé este que puso Germán en clase.
    return Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(console.log(`SE HA ACTUALIZADO EL TIEMPO `))
      .catch(err => console.log('ERROR:', err));
  })
  // ITERACIÓN 5
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
      .then(console.log(`CARROT CAKE ELIMINADA `))
      .catch(err => console.log('ERROR:', err));
  })
  .catch(err => console.log('ERROR', err))

// ITERACIÓN 6 No sé si es esto, pero es lo que entiendo que cierra la base de datos

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })




// Recipe.insertMany(data)
//   .then(() => {
//     console.log('Aqui va insertMany')
//   })
//   .catch(error => console.error('Error connecting to the database', error));