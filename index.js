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
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Tapioca with egg",
      level: "Easy Peasy",
      ingredients: ["2 tbsp. of tapioca", "one egg", "spices"],
      cusine: "Brasilian",
      dishType: "breakfast",
      image: "https://corpoacorpo.com.br/upload/imagens_upload/tapioca_com_ovo.jpg",
      duration: 10
    })
  })
    .then((result) => {
      console.log('CREATE RECIPE TITLE', result)
    }).catch((err) => console.error(err)); 

      Recipe.insertMany(data).then(result => {
      result.map(recipe => console.log(recipe.title)).catch((err) => console.error(err));
      
      Recipe.updateOne({title: 'Rigatoni alla Genovese'},
      {$set: {diration: 100}}).then((result) => {
        console.log("update succesful!", result);
      }).catch((err) => console.error(err));

      Recipe.deleteOne({title: 'Carrot Cake'}).then((result) => {
      console.log("deletion successful", result).catch((err) => console.error(err));

    }).catch((err) => console.error(err));
   
    });