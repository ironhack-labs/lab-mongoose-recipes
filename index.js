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
    return self.connection.dropDatabase();
  })
  .then(() => {
    const newRecipe = {
      title: 'Popcorn',
      level: 'UltraPro Chef',
      ingredients: ['corn for popcorn', 'salt', 'oil'],
      cuisine: 'Mexican',
      dishType: 'snack',
      image: 'https://bellyfull.net/wp-content/uploads/2019/09/Perfect-Stovetop-Popcorn-blog-2-500x500.jpg',
      duration: 5,
      creator: 'Henrique Morikawa',
      created: new Date (03, 13, 2021)
    }

    // Recipe.create(newRecipe).then(() => 
      // console.log(newRecipe.title))

    // Recipe.insertMany(data).then(() => 
    //   data.map((element)=>{
    //     console.log(element.title)
    // })

    Recipe.findOneAndUpdate(({title: 'Rigatoni alla Genovese'}, {duration: 100})).then(() =>
      console.log('success!!!'),
      )

    Recipe.deleteOne({title: 'Carrot Cake'}).then(() =>
      console.log('deleted successfully'))

    mongoose.disconnect();
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
