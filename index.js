const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

      //Iteracion 2

  Recipe.create({
    title: "Hot Cakes",
    level: "Amateur Chef",
    ingredients: [
      "1/2 flour",
      "2 eggs",
      "1/2 milk",
      "1/4 sugar",
      "1/4 butter",
      "1/2 vainilla essence",
    ],
    cuisine: "American",
    dishType: "breakfast",
    image: "https://img.taste.com.au/k1u7_o89/w720-h480-cfill-q80/taste/2016/11/american-hotcakes-98829-1.jpeg",
    duration: 20,
    creator: "Chef Roman"

  }).then((r) => {console.log(r)}).catch((e) =>{console.log(e)})

  //Iteracion 3
  Recipe.insertMany(data).then(function(){
    console.log("Data inserted")
  }).catch(function(error){
    console.log(error)
  })

  //Iteracion 4

  Recipe.updateOne({ title: "Rigatoni alla Genovese" }, {duration: 100 },{new:true})
  .then((r) => console.log(r))
  .catch((e) => console.log(e));

  //Iteracion 5

  Recipe.deleteOne({title: "Carrot Cake" })
  .then((r) => console.log(r))
  .catch((e) => console.log(e));

  //Iteracion 6

  mongoose.connection.close()

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



