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
    updateDatabase();
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  //CRUD - Create, Read, Update, Delete
async function updateDatabase() {
  try {

  //Create 
  const recipeCreated = await Recipe.create({
  title:"Funge" , 
  level: "UltraPro Chef", 
  ingredients:  ["Cassava", "Flour", "Water", "Palm Oil", "Fish"],
  cuisine: "Angolan", 
  dishType: "other", 
  image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F5%2F59%2FCalulu.jpg&imgrefurl=https%3A%2F%2Fpt.wikipedia.org%2Fwiki%2FCalulu&tbnid=TiygtYtgQw4n9M&vet=12ahUKEwjdsLOTu7DxAhUKyRoKHV0QCvMQMygAegUIARCwAQ..i&docid=i0e1FvbpUFyZ5M&w=3208&h=2323&q=funge%20de%20calulu&ved=2ahUKEwjdsLOTu7DxAhUKyRoKHV0QCvMQMygAegUIARCwAQ", 
  duration: 10, 
  creator: "Stefano", 
  created:"", 
  });
  console.log('Model created', recipeCreated.title);

 const recipeArray = await Recipe.insertMany(data);

 recipeArray.forEach(helder => {
    console.log(helder.title);
  });

} catch (e) {
  console.log("error occurred", e);
}
finally {
  mongoose.connection.close();
}
}