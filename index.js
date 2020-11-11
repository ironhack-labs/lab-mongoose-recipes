const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')



// Import of the data from './data.json'
const data = require('./data');
const { insertMany } = require('./models/Recipe.model');




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
    return Recipe.create({
      title: 'Sushi',
      level: 'UltraPro Chef',
      ingredients: ['rice', 'salmon', 'etc'],
      cuisine: 'japanesse',
      dishType: 'main_course',
      image: '',
      duration: 40,
      creator: 'Loreto',
      created: ''
    })
      
    .then(response => console.log('El titulo es:', response.title))
  })

    .then(() => {
      return Recipe.insertMany(data)
      .then(recipies => recipies.forEach(elm => console.log('Los titulos son:', elm.title)))
    })

  
    .then(() => {
      return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, {duration: 100}, {new: true})
        .then(response => console.log('En verdad tardan:', response.duration))
    })

    .then(() => {

    return Recipe.deleteOne({ title: 'Carrot Cake' })
        .then(res => console.log('Oh vaya, no nos queda:', res))
      
    })
 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  // mongoose.connection.close(console.log('Adeuuus'))

