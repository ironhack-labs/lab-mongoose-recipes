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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

(async () => {
  try {
    const receta = await Recipe.create({
      title: "Pollo a la miel",
      level: "Easy Peasy",
      ingredients: ['pollo', 'pimienta blanca', 'salsa de soja', 'ajo', 'vino de arroz', 'vinagre de arroz', 'maicena', 'harina de trigo', 'vinagre de arroz', 'gengibre'],
      cuisine: "Chinese",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 30,
      creator: "youtube",
      });
  console.log(`This recipe was saved ${receta.title}`);
  let multiRecipes = await Recipe.insertMany(data)
  for (let i=0; i< multiRecipes.length;i++){
    console.log(data[i].title)
  }
  let updateName = await Recipe.findOneAndUpdate({title : "Rigatoni alla Genovese"}, {duration:100}, {new:true})
  console.log(updateName);

  let removeRecipe = await Recipe.deleteOne({title:'Carrot Cake'})
  console.log(`the recipe has been removed`)
  mongoose.connection.close()
} catch (error) {
  console.log(error.message);
}
  }) ();

//ITERACION 6


