const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model.js');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // https://mongoosejs.com/docs/deprecations.html
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // create just one document inside db
    Recipe.create({
      title: 'Pancake',
      level: 'Amateur Chef',
      ingredients: ['eggs', 'milk', 'flour'],
      cuisine: 'Berlin',
      dishType: 'dessert', 
      image: '',
      duration: 30,
      creator: 'me'
    })

    // insert the whole data.json into db
    Recipe.insertMany(data)
    console.log('log data inside db:' + data)

    // update an existing document inside db
    Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true }).then(() => {
      console.log('successfully updated Rigatoni' + data.title)
    })
    
    // remove recipe
    Recipe.deleteOne({ title: "Carrot Cake"}).then(() => {
      console.log('Carrot Cake deleted - what a shame')
    })
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
