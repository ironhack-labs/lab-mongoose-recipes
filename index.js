const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const connectToDb = async () => {

  try {
    const Connection = await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`Connected to the database: "${Connection.connection.name}"`);

    await Connection.connection.dropDatabase();

    // iteration 2
    // Recipe.create(data[0])
    // iteration 3
    await Recipe.create(data);
    // iteration 4
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
    );
    await Recipe.deleteOne({ title: "Carrot Cake" });

    await Connection.disconnect();
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

connectToDb();
