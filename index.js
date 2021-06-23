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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    return Recipe.syncIndexes()
  })

  .then(()=> {
     return Recipe
        .create([
          {
            title: "Thighs Ironhack Style",
            level: "Amateur Chef",
            ingredients: [
              "1/2 cup rice vinegar",
              "8 tablespoons honey",
              "1/3 cup soy sauce (such as Silver Swan®)",
              "1/4 cup Asian (toasted) sesame oil",
              "3 tablespoons Asian chili garlic sauce",
              "45 tablespoons minced garlic",
              "salt to taste",
              "5 skinless, boneless chicken thighs"
            ],
            cuisine: "Asian",
            dishType: "main_course",
            image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
            duration: 40,
            creator: "Chef Papu"
          }
        ])

      .then(recipe => console.log('Se ha creado estos registros:', recipe))
  }) 
  
  .then(() => {
    return Recipe
      .create(data)
      .then(recipe => console.log('Se ha creado estos registros:', recipe))
      .catch(err => console.log('Creating error!', err))
  })
  
  .then(() => {
    return Recipe
      .findOneAndUpdate({ duration: 220 }, { duration: 100 })
      .then(info => console.log("Success message!, Updated One!", info))
      .catch(err => console.log('Updating error!', err))
  })

  .then(() => {
    return Recipe
      .deleteOne({ title: "Carrot Cake" })
      .then(info => console.log("Success message!. Deleted One!", info))
      .catch(err => console.log('Deleting error!', err))
  })

  .then(() => {
    mongoose.connection.close(() => {
  console.log('Mongoose default connection closed')
    })
  })

  .catch(error => {
      console.error('Error connecting to the database', error);
  })    


