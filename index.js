const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())


  .then(() => {
      return Recipe.create({
        title: 'Paella',
        level: 'UltraPro Chef',
        ingredients : ['arroz', 'marisco','fumet','colorante','sofrito mediterraneo','paciencia'],
        cuisine: 'mediterranea',
        dishType: 'main_course',
        Image: 'https://cucharonypasoatras.es/wp-content/uploads/2020/01/traditional-spanish-dish-paella-with-prawns-mussels_103153-153.jpg' ,
        duration: 100 ,
        creator: 'Algun Valenciano',
      });
  })
  .then((newRecipe) => {
    console.log('New recipe has been created:', newRecipe.title);
    return Recipe.find();
  })

  //

  .then(()=> {
    return Recipe.create(data);
  })

  .then((allRecipes)=>{
      allRecipes.foreach((recipe)=>
      console.log(`The recipes are:${recipe.title}`)
      );

      return Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100},
          { new: true}
        );
  }) 

  .then((recipe) =>{
    console.log(`The duration of the recipe ${recipe.title} was updated to ${recipe.duration}`);
      return Recipe.deleteOne({title: "Carrot Cake"});
  })

  .then((recipe) =>{
    console.log(`The recipe ${recipe.title} was deleted`);
  })

  .catch((error) => {
    console.error('Error connecting to the database', error);
  });


  process.on("SIGINT", () => {
    mongoose.connection.close(()=>{
      console.log("Mongoose default connection disconnected");
      process.exit(0);
    });

  });
