const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');
const { update } = require('./models/Recipe.model');

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

    //Iteracion 2
    var newRecipe = {
      title: "Tabulé",
      level: 'Easy Peasy',
      ingredients: ['quinoa', 'strawberries', 'mint', 'onion', 'lemon juice', 'tomatoes' ],
      cuisine: 'french',
      dishType: 'other',
      duration: 15,
      creator: '',
    };
    (async () => {
      try{
        const user = await Recipe.create(newRecipe);
        console.log(`${user.title}`);
        //Iteracion 3
        let multiRecipes = await Recipe.insertMany(data)
        for( let i=0; i< multiRecipes.length; i++){
          console.log(data[i].title)
        }
        // Iteracion 4
        let doc = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},  {duration: 100}, {new: true}); 
        console.log(doc);
        // Iteracion 5
        let del = await Recipe.deleteOne({title: 'Carrot Cake'})
        console.log(del)
      } catch (error){
        console.log(error.message)
      }
    })();
    // Iteracion 6
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  
