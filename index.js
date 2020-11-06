const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

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
    //return self.connection.dropDatabase();
  })
  .then(() => {
   
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


//!  //* ITERATION 2
  const pannaCotta = {
    title: "Panna Cotta",
    level: "Easy Peasy",
    ingredients: ["Cream", "Milk", "Sugar", "Gelatin","Vanilla","OrangeBlossom" ],
    cuisine: "Italian",
    dishType: "dessert", 
    image: "default",
    duration: 20,
    creator: "A Piémont citizen",
  };
  Recipe.create(pannaCotta)
    .then((recipe) => {
      console.log(`your recipe ${recipe} has been added`);
    })
    .catch((errReceived) => console.log(errReceived)); 
 
//!    //* ITERATION 3 
  Recipe.create(data)
  .then((results) => { 
  for (let result of results){
  console.log(result.title);
  }})
  .catch((errReceived) => console.log(errReceived));

 //!   //* ITERATION 4
  const filter = {title: "Rigatoni alla Genovese"};
  const update = {duration: 100};

  Recipe.findOneAndUpdate(filter, update, { new: true })
    .then(()=>console.log(`recipe rigatoni updated`))
    .catch((errReceived) => console.log(errReceived))

//!   //* ITERATION 5
Recipe.deleteOne({title: "Carrot Cake"})
  .then(()=>console.log(`Carrot Cake has been deleted`))
  .catch((errReceived) => console.log(errReceived))
   


process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
