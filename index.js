const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data.json');
const { schema } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const myData = {
title : 'paratha',
level : 'Amateur Chef',
ingredients : ['wheatclfour','Oil','Chillie Powder','Salt','garlic'],
cuisine : 'Indiaase',
dishType : 'snack',
duration : 15,
creator : 'Me',
created :'2020-11-09' 
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return self.connection.dropDatabase();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
 
    //Iteration #3
    Recipe.insertMany(data)
    .then((results) => {
      for (items of results){
        console.log(items.title);
    }})
    .catch((errReceived) => console.error(errReceived));

   // #Iteration 2
     Recipe.create(myData)
    .then((results) => console.log(`Results from mydatabase : ${results.title}`))
    .catch((errReceived) => console.error(errReceived))  
  
  
    //#Iteration 4 - Update recipe
   Recipe.findOneAndUpdate({title : 'Rigatoni alla Genovese'},{duration : 100},{new : true})
  .then(() => console.log("Successfully Updated"))
  .catch((errorReceivedForUpdate) => console.error(errorReceivedForUpdate)); 

//#Iteration 5 - Remove a Recipe
 Recipe.deleteOne({title: 'Carrot Cake'})
.then(() => console.log("Successfully Deleted"))
.catch((errorReceivedForDelete) => console.error(errorReceivedForDelete)); 

//### Iteration 6 - Close the Database
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(`Mongo connection disconnected`);
    process.exit(0);
  });
});


