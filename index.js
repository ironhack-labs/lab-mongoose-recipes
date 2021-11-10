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
  .then(() => Recipe.syncIndexes())
  .then(() => { Recipe.create([{

    "title": "Spaguetti Carbonara",
    "level": "Amateur Chef",
    "ingredients": [
      "200 grs. Spaguetti",
      "50 grs. Guanciale",
      "200 grs. Grana Padano Cheese",
      "4 eggs",
      "1 teaspoon salt",
      "4 teaspoons ground black pepper"
    ],
    "cuisine": "Italian",
    "dishType": "main_course",
    "image": "https://elmundoenrecetas.s3.amazonaws.com/uploads/recipe/picture/108/IMG_500px.jpg",
    "duration": 100,
    "creator": "Chef Guiseppe"
  }])
  .then((newrecipe)=> console.log(newrecipe))

  .then(()=> Recipe.create(data))
  .then((newrecipe)=> newrecipe.forEach(elm => console.log(elm.title)))

  .then(()=> Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100},{new:true}))
  .then(()=> (console.log('Tu receta ha sido actualizada!')))

  .then(()=> Recipe.deleteOne({title:'Carrot Cake'}))
  .then(()=> console.log('Se ha eliminado tu receta correctamente'))

  .then(()=> mongoose.connection.close())
  .then(()=> console.log('Hasta la vista,babe..!!'))

    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
