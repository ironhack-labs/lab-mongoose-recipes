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
   // return self.connection.dropDatabase();
  })
  .then(() => {

/*     //ITERATION 2

  (async () => {
    try {
      const recipe = await Recipe.create({
        title: "Crema de calabaza",
        level: 'Easy Peasy',
        ingredients: ['calabaza', 'agua', 'sal', 'aceite'],
        cuisine: "Mediterránea",
        dishType: 'soup',
        image: "https://images.media-allrecipes.com/images/75131.jpg",
        duration: 20,
        creator: "Cristina Castro",
        created: 22/10/2020
      });
      //console.log(recipe)
      console.log(`The name of this recipe is ${recipe.title}`);
    } catch (error) {
      console.log(error.message);
    }
  })(); 
 
  //console.log(data);


  //ITERATION 3

   (async () => {
    try {
      const insert = await Recipe.insertMany(data);
      console.log(insert.map(recipes => recipes.title));
    } catch (error) {
      console.log(error.message);
    }
  })();  

  //ITERATION 4

 (async () => {
  try {
    const update = await Recipe.findByIdAndUpdate("5f905d35cb7b3a7ccd5fb881", 
      { duration: 100},
      { new: true }
    );
    console.log(update);
  } catch (error) {
    console.log(error.message);
  }
})();   */


//ITERATION 5

/*   (async () => {
  try {
    const deleted = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log(deleted);
  } catch (error) {
    console.log(error.message);
  }
})();    
 

//ITERATION 6

var close = mongoose.connection.close()
console.log(close) */


  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  