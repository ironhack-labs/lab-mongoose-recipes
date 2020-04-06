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
    useFindAndModify: false // tiene que ir para usar el find and update
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {
    // ITERACIÓN 2 
    Recipe.create({
      title: "hotdogs",
      level: "Easy Peasy",
      ingredients: ["sausage", "bimbo bread", "mayonaise", "mustard"],
      cuisine: "Mexico",
      dishType: "snack",
      image: "",
      duration: 10,
      creator: "Everyone"

    })

  // insert data.json in DB
    Recipe.insertMany(data)
    console.log(`Log data inside db: ${data}`) 

  })

    Recipe.findOneAndUpdate(  {title: "Rigatoni alla Genovese"}, {duration:100}, {new:true}    )
      .then(  () => {console.log ("updated Rigatori")}         )
  
    Recipe.deleteOne( { title: "Carrot Cake"} )
    .then(  () =>   {console.log('Carrot Cake deleted')}        )


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
