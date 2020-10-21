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
    //return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  //Iteración 2
  (async () => {
    try {
      const receipe = await Recipe.create({
        title: "Bread with tomato",
        level: "Easy Peasy",
        ingredients: ["bread", "tomato", "oil", "salt"],
        cuisine: "Mediterranean",
        dishType: 'breakfast',
        image: "https://www.google.com/search?q=pa+amb+tomaquet&sxsrf=ALeKk02MeVPFkzVBUdmSB8-pW7Gnkjx-Sg:1603291186716&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj2-Z6N9cXsAhUBBGMBHXmGDqcQ_AUoAXoECBkQAw&biw=1440&bih=821#imgrc=TlWnOrUN1MCJoM",
        duration: 2,
        creator: "Carla Navia",
        created: Date.today
      });
      console.log(`This receipe was saved ${receipe}`);
    } catch (error) {
      console.log(error.message);
    }
  })();

  //Iteración 3
  (async () => {
    try {
      const insert = await Recipe.insertMany(data);
      //insert.map(acc => console.log(acc.title));
      //console.log(insert);
    } catch (error) {
      console.log(error.message);
    }
  })();
  
  //Iteración 4
  (async () => {
    try {
      const update = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: "100" },
        { new: true }
      );
      console.log(update);
    } catch (error) {
      console.log(error.message);
    }
  })();

  //Iteración 5
  (async () => {
    try {
      const deleted = await Recipe.deleteOne({ title: "Carrot Cake" });
      console.log(deleted);
    } catch (error) {
      console.log(error.message);
    }
  })();

  //Iteración 6
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });
