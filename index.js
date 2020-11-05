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
  .then(() => {
    const firstRecipe = {
      title : 'Pasta alla Norma',
      level : 'Easy Peasy',
      ingredients : ['1/4 c. extra-virgin olive oil', '1 lb. eggplant', 'Kosher salt', '1 lb. rigatoni', '1 small yellow onion', '3 cloves garlic', '1 tsp. dried oregano', '1/4 tsp. red pepper flakes', '1 can crushed tomatoes', 'Freshly ground black pepper', 'Ricotta salata','Basil'],
      cuisine : 'Sicilian',
      dishType : 'main_course',
      image : 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/20200930-ehg-delish-pasta-alla-norma-12633-1603848362.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*',
      duration : 55,
      creator : 'Emad',
    };

  return Recipe.create(firstRecipe).then(() =>{
    console.log('add firstRecipe');
  });
  })

  .then(() => {return Recipe.insertMany(data).then(()=> {
    console.log('added successfully');
    });
  })

  .then(() => { return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100} , {new: true}).then(() => {
    console.log('updated');
    });
  })

  .then(() => {return Recipe.findOneAndDelete({title: 'Carrot Cake'}) .then(() => {
    console.log('delete Carrot Cake');
  });
  })

  .then(() => {process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log(`Mongo connection disconnected`);
        process.exit(0);
      });
    })
  })
 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });