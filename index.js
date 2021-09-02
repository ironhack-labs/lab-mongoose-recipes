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

  })
  .then(() => {
    const updated = Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {duration: 100}
    );
    return updated;
  })
  .then(() => {
    const remove = Recipe.deleteOne ({title: "Carrot Cake"});
    return remove;
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

 
Recipe.create({
    title: 'miXto quente',
    level: 'Easy Peasy',
    ingredients: ['pão francês', 'queijo', 'presunto'],
    cuisine: 'Brasileira',
    dishType: 'Snack',
    image:
        'http://culinaria.culturamix.com/blog/wp-content/gallery/misto-quente-3/Misto-Quente-6.jpg',
    duration: 5,
    creator: 'JOC'
})


Recipe.deleteMany()
 .then( response => {
   console.log(`Deleted ${response.deletedCount} elements`)
   Recipe.insertMany(data)
     .then(response =>{
       console.log(`There are all the recipe titles: ${Recipe.title}`);
       mongoose.connection.close();
     })
   })
   .catch(err => console.log(`An error occurred seeding the DB: ${err}`))
 
