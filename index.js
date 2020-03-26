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
      title: "Espetinho de Gato",
      level: "Easy Peasy",
      ingredients:[
        "gato",
        "carvão",
        "sal grosso"
      ],
      cuisine:"Ogrosine",
      dishType:"Main Course",
      image: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.naoentreaki.com.br%2F8067984-churrasquinho-de-gato.htm&psig=AOvVaw398Qi_lGTqEKR9xZiEG7x3&ust=1585342687884000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiooPWDuegCFQAAAAAdAAAAABAD",
      duration: 100,
      creator: "Gustavo & Rafael",
      created: new Date
      
    })
    Recipe.insertMany(data);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  //Print all recipe's title
  Recipe
    .find({},{title: 1, _id:0})
    .then(response => response.forEach(a => console.log(a.title)))
    .catch(error => console.log(error))

  //Find Rigatoni recipe and update duration
  Recipe
    .findOneAndUpdate({title: /riga/i},{$set: {duration: 100}}, {useFindAndModify: false})
    .then(response => {
      console.log(response);
    })
    .catch(error => console.log(error))

  // Print Rigatoni with new duration
  Recipe
    .find({title: /riga/i},{duration: 1, _id:0})
    .then(response => console.log(response))
    .catch(error => console.log(error))

  // Remove Carrot Cake
  Recipe
    .deleteOne({title: /cake/i})
    .then(response => console.log(response))
    .catch(error => console.log(error));

// Close database
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Terminated Node server and Disconnected from Database');
    process.exit(0);
  });
});
