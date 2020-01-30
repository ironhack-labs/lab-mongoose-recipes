const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb+srv://ironhack:ironhack@cluster0-29wuy.mongodb.net/test', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) =>
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`,
    ),
  )
  .catch((err) => console.error('Error connecting to mongo', err));

// Recipe.insertMany(data);
/* Recipe.findOneAndUpdate(
  { title: 'Rigatoni alla Genovese' },
  { duration: 100 },
  {
    new: true,
    upsert: true,
  },
);
 */
// Recipe.deleteOne({ title: 'Carrot Cake' });
