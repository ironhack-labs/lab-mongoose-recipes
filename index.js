const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

//Insert One
const data1 = { title: "Grilled Salmon", level: "Easy Peasy", ingredients: ["Samon", "sal", "Black Pepper", "Olive oil", "Parsely"], cuisine: "Asian", dishType: "Other", duration: 30 };
Recipe.create(data1)
  .then(recep => console.log("The recipies is save and it's value is ", recep))
  .catch(error =>
    console.log('An error happened while saving a new user:', error)
  );
//Insert many
Recipe.insertMany(data)
  .then(recep => console.log("The recipies are saved and it's value is ", recep))
  .catch(error =>
    console.log('An error happened while saving a new user:', error));

Recipe.find({})
  .then(recep => {
    recep.map(r => console.log(r.title))
  })
  .catch((err) => { console.log(err) })

//update
Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(receip => console.log("updated", receip))
  .catch((err) => console.log(err));
Recipe.find({ title: "Rigatoni alla Genovese" })
  .then(recep => {
    recep.map(r => console.log(r.duration))
  })
  .catch((err) => { console.log(err) })
//Remove
Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(r => console.log("Succesfull deleted"))
  .catch(err => console.log(err));


//close
mongoose.connection.close();
