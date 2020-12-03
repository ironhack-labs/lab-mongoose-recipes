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
    Recipe.create({
      title: "Banana and Chocolate Cake",
      level: "Amateur Chef",
      ingredients: [
        "2 cups Oatmeal flour",
        "4 Bananas",
        "4 Eggs",
        "1 tablespoon Cake yeast",
        "Cinnamon powder",
        "1 Chocolate bar"
      ],
      cuisine: "Brazilian",
      dishType: "dessert",
      duration: 60,
      creator: "A Brazilian person",
    })
    .then((result) => {
      console.log(result.title);
    })
    .catch((err) => {
      console.error(err);
    });   
     
    Recipe.insertMany(data)
      .then((result) => {
        result.map((result) => console.log(result.title));
          Recipe.findOneAndUpdate(
            {title: "Rigatoni alla Genovese"},
            {duration: 100}
          )
          .then((result) => {
            console.log(`Duration updared...? ${result.duration}`)
          })
          .catch((err) => {
            console.error(err);
          })
            
          Recipe.deleteOne({title: "Carrot Cake"})
            .then((result) => {
              console.log(`Recipe deleted...? ${result}`)

              mongoose.connection.close();
            })
            .catch((err) => {
              console.error(err)
            })      
    .catch((err) => {
      console.error(err)
    })  
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
})})