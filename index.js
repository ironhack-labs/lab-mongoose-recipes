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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Carrot Cookie',
      level: 'Kitchen Killer',
      ingredients: ['6 cups grated carrots', '4 teaspoons ground cinnamon'],
      cuisine: 'International',
      dishType: 'dessert',
      image:
        'https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg',
      duration: 130,
      creator: 'Chef Nadia',
    })
      .then((insertion) => console.log(`Insertion: ${insertion.title}`))
      .catch((err) => console.log(`Create failed with the error ${err}`));

    Recipe.insertMany(data)
      .then((arrOfObjects) =>
        arrOfObjects.forEach((obj) => {
          console.log(`Title: ${obj.title}`);
        })
      )
      .then(() =>
        Recipe.findOneAndUpdate(
          { title: 'Rigatoni alla Genovese' },
          { duration: 111 }
        )
      )
      .then(() =>
        Recipe.deleteOne({ title: 'Carrot Cake' }, (err, item) => {
          if (err) console.log(`Record was not removed 😱`);
          else console.log(`Records removed: ${item.deletedCount}`);
        })
      )
      .then(() => mongoose.connection.close())
      .catch((err) => console.error(`Error: ${err} 💀`));
  })
  .catch((err) => console.error('Error connecting to the database', err));
