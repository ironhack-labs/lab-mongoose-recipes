const Recipe = require('./models/Recipe.model');


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipe1 = new Recipe({
  title: 'Coffee',
  level: 'Easy Peasy',
  ingredients: [
    "4 cups of coffee",
    "1L of Water",
    "4 teaspoons of sugar",
    "Paper Filter",
  ],
  cuisine: "world cuisine",
  dishType: "drink",
  image: "https://en.wikipedia.org/wiki/Coffee",
  duration: 15,
  creator: "Massao & Thiago",
}
)

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
    
    recipe1.save()
      .then(response => console.log(response))
      .catch(err => console.log(err))
        
    let recipes = []
    data.forEach(rec => {
      recipes.push(new Recipe(rec))
    })
    Recipe.insertMany(recipes)
      .then(response => {
        Recipe.findOneAndUpdate({
            title: 'Rigatoni alla Genovese'
          }, {
            duration: 100
          })
          .then(response => console.log("Ok"))
          .catch(err => console.log(err))

        Recipe.deleteOne({
            title: "Carrot Cake"
          })
          .then(response => console.log("OK"))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
})

    
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });





