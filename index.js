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
    Recipe
      .create({ title: "Arepa", level: "Easy Peasy", ingredients: ["Harina Pan", "sal", "agua"], cuisine: "venezolana", dishType: "breakfast", image: "https://www.recetasderechupete.com/wp-content/uploads/2019/11/Tipos-de-arepa-2-768x527.jpg", duration: 30}
      )
      .then(theNewRecipe => console.log("New recipe: ", theNewRecipe.title))
      Recipe
        .insertMany(data, function(error,result) {
          if (error) {console.log(error)
          } else {
            data.forEach(elm => console.log("New recipe: ", elm.title ))
          }
        })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
