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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({
        title: "Spaghetti alla carbonara",
        level: "Amateur Chef",
        ingredients: [
          "200gr spaghetti",
          "1 egg",
          "100gr speck",
          "100gr parmesan cheese",
          "1/4 cup olive oil",
          "salt to taste"
        ],
        cuisine: "Italian",
        dishType: "main_course",
        image: "https://i.blogs.es/eed2d0/carbonara_rec/450_1000.jpg",
        duration: 40,
        creator: "Chef Alba"
      })
      .then((result) => {
        console.log(result.title)
      })
      .catch((error) => {
        console.log(error)
      })

    Recipe.insertMany(data)
      .then((result) => {
        result.forEach((result) => console.log(result.title))
      })
      .catch((error) => {
        console.log(error)
      })

    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
      .then((result) => {
        console.log(`Your new duration is ${result.duration}`)
      })
      .catch((error) => {
        console.log(error)
      })

    Recipe.deleteOne({title: 'Carrot Cake'})
    .then((result) => {
      console.log(`The recipe Carrot Cake is no longer available`)
    })
    .catch((error) => {
      console.log(error)
    })

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close()