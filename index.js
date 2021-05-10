const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { model } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//because I kept getting deprecation warnings when using findOneAndUpdate :/
mongoose.set('useFindAndModify', false);

// Connection to the database 'recipe-app'
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: '${self.connection.name}'`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  //trying async
  .then(async () => {
    try {
      await  Recipe.create({
        title: 'BLT',
        level: 'Amateur Chef',
        ingredients: ['sourdough bread', 'bacon', 'tomato', 'mayo', 'crisp lettuce', 'salt', 'pepper'],
        cuisine: 'sandwich',
        dishType: 'breakfast',
        image:
        'https://static01.nyt.com/images/2020/08/18/dining/27Diaryrex4/27Diaryrex4-articleLarge.jpg',
        duration: 10,
        creator: 'pops'
      })
      .catch((e) => {
        console.error(`We got error ${e}`);
      });
      const allRecipes = await Recipe.insertMany(data);
      console.log(`You've added ${allRecipes.length} recipes :`);
      allRecipes.forEach((recipe, i) => {
        console.log(`${i+1}. ${recipe.title}`);
      });
      //finOneAndUpdate returns a Promise that resolves to a single document with the arg {new : true} will return the updated doc/object so you can access the info, it returns 
      const updatedRecipe = await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, {new: true});
      console.log(`You've updated the duration of ${updatedRecipe.title} to ${updatedRecipe.duration} mins`);
      const deletedRecipe = await Recipe.findOneAndDelete({ title: 'Carrot Cake' })
      .then(m => {
        console.log(`${m.title} is gone 〳 ‾́ ﹏ ‾́ 〵`)
      });
      // close connection
      process.exit();
    } catch (e) {
      console.log(`oops, we got this error: ${e}`);
    }
  })
  .catch((e) => {
    console.error('Error connecting to the database', e);
  });
  
  
 