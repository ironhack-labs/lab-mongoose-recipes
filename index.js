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
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then((result) => {
    Recipe.insertMany(data)
    /* Recipe.create({
      title: "Asian Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
      "1/2 cup rice vinegar",
      "5 tablespoons honey",
      "1/3 cup soy sauce (such as Silver Swan®)",
      "1/4 cup Asian (toasted) sesame oil",
      "3 tablespoons Asian chili garlic sauce",
      "3 tablespoons minced garlic",
      "salt to taste",
      "8 skinless, boneless chicken thighs"
    ],
    cuisine: "Asian",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    duration: 40,
    creator: "Chef LePapu"
    }) */
    .then((result2)=>{
      result2.forEach((recipe)=>{console.log(recipe.title)})
      Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duration: 100})
      .then((result3)=>{
        console.log(`Success`)
        Recipe.deleteOne({title:"Carrot Cake"})
        .then((result4)=>{
          console.log(`Carrot Cake erased successfully`)
          mongoose.connection.close()
          .then((result5)=>{
            console.log(`All Iterations done and Database closed ;)`)
          })
        })
      })
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
