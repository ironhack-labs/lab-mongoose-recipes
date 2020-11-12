const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const recipe1 = {
  "title": "Orange and Milk-Braised Pork Carnitas",
  "level": "UltraPro Chef",
  "ingredients": [
    "3 1/2 pounds boneless pork shoulder, cut into large pieces",
    "1 tablespoon freshly ground black pepper",
    "1 tablespoon kosher salt, or more to taste",
    "2 tablespoons vegetable oil",
    "2 bay leaves",
    "2 teaspoons ground cumin",
    "1 teaspoon dried oregano",
    "1/4 teaspoon cayenne pepper",
    "1 orange, juiced and zested"
  ],
  "cuisine": "American",
  "dishType": "main_course",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
  "duration": 160,
  "creator": "Chef John"
}
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
    const pr = Recipe.insertMany(data);
    return pr
  })
  .then(() => {
    const pr = Recipe.find();
    return pr
  })
  .then((db)=> {
    db.map(x=>console.log("title:", x.title))
  })
    // Run your code here, after you have insured that the connection was made
.then(() => {

  const pr = Recipe.findOneAndUpdate(
    {name: "Rigatoni alla Genovese"},
    { $set: {duration: 100}}
  );

  return pr
})
.then(() => {
  console.log("Success!");
})

.then(() => {
  const pr = Recipe.deleteOne({ name: "Carrot Cake" });

  return pr;
})
.then(() =>{
  console.log("RIP Carrot Cake")
})

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  process.on('SIGINT',  () => {

    mongoose.connection.close( () => {
      console.log('Mongoose connection disconnected due to app termination');
    });
  
  });