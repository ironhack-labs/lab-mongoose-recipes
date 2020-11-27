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
    Recipe.create(data)//Iteración 2-3
    .then(
      (recipe) => {
        recipe.forEach(recipeTitle => console.log(recipeTitle.title))
        return recipe
      }
    )
    .then((res,req)=>{//Iteración 4
      Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100},{new:true}).then((recipe)=>{
        console.log("Bro U niled, the duration is updated",recipe);
      })
      return res
    })
    .then(()=>{//Iteracion 5
      Recipe.deleteOne({title:"Carrot Cake"}).then(()=>{
        console.log("Really? Don't U like Carrot Cake?",)

        mongoose.connection.close(() => {//Iteracion 6
              console.log(
                "Mongoose default connection disconnected through app termination"
              );
              process.exit(0);
            })
      })

    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
