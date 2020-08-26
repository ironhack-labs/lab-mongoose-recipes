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
    async function saveFood(){
        //iteration 2
        const receta = await Recipe.create(
            {
            title: "Chilaquiles",
            levele: "Easy Peasy",
            cuisine: "Mexican"
            });
        console.log("Chilaquiles") 
        //iteration 3
        await Recipe.insertMany(data);
        let recetas = await Recipe.find({}, { title: 1 });
        console.log(recetas);
        //iteration 4
        await Recipe.findOneAndUpdate(
            { title: "Rigatoni alla Genovese" },
            { duration: 100 },
            {returnOriginal: false,
            }
          );
          console.log("Rigatoni alla Genovese - update");
          //iteration 5
          await Recipe.findOneAndDelete({ 
              title: "Carrot Cake" 
            });
          console.log("Carrot Cake Recipe no longer exists!");
          //iteration 6
          await mongoose.connection.close();
          console.log("Mongoose default connection disconnected through app termination");
      }
      
      saveFood()
    // Run your code here, after you have insured that the connection was made
  })

 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




