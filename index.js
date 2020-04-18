const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

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
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
      duration: 220,
      creator: "Chef Luigi"
    });
   })

   .then((recipe) => {
    console.log("one recipe created", recipe.title);
  }) 

  .then(() => {
    Recipe.insertMany(data, (error, recipes) => {
      
      if (error) return console.log('error:', error);
      recipes.forEach(recipe => {
        console.log('recipe saved:', recipe.title);
      });
    });
  })


  //Working on running the below after the above. 
  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: 'true'})
  })

  .then((recipe) => {
    console.log('recipe updated:', recipe.title)
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  