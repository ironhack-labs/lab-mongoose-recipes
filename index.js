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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async() => {
    // Run your code here, after you have insured that the connection was made
    //TO KEEP EXEMPLE AVEC THEN SI PAS DE ASYNC FUNC:
    // Recipe.create({
    //   title: " Cookies Nuts Chocolate",
    //   level: "Easy Peasy",
    //   ingredients: ['butter', 'brown sugar', 'farine', 'flour', 'Chocolate crunch', 'Nuts', 'egg', 'vanilla sugar', 'baking powder', 'salt'],
    //   cuisine: "home made",
    //   dishType: "dessert",
    //   duration: "30",
    //   creator: "Us people"
    // }).then(insertedRecipe => {
    //   console.log("\n\n**** Iteration 1 ---> create one recipe *******\n");
    //   console.log(insertedRecipe);
    // })

    //Iteration 2
    const insertedRecipe = await Recipe.create({
      title: " Cookies Nuts Chocolate",
      level: "Easy Peasy",
      ingredients: ['butter', 'brown sugar', 'farine', 'flour', 'Chocolate crunch', 'Nuts', 'egg', 'vanilla sugar', 'baking powder', 'salt'],
      cuisine: "home made",
      dishType: "dessert",
      duration: "30",
      creator: "Us people"
    });
      console.log(`\r\nInserted one recipe: ${insertedRecipe.title}\r\n`);

    //Iteration 3  
    const insertManyRecipes = await Recipe.insertMany(data);
    console.log("Inserted recipes : \r\n");
    insertManyRecipes.forEach(recipe => console.log(`title: ${recipe.title}`));
    console.log(`\r\n`);

    //Iteration 4
    const updateSpecRecipe =  await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      {
        duration: 100,
      },
      { new: true }
    );
    console.log(`\r\nUpdate: ${updateSpecRecipe.title} with sucess!!`);

    //Iteration 5
    const deletedRecipe = await Recipe.deleteOne({
      title: "Carrot Cake",
    });
    console.log(`\r\nDeleted one row with success`);

    //Iteration 6
    mongoose.connection.close();
    console.log(`\r\nYou close the DB!!`);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
