const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({
  title:'Chongos Zamoranos',
  level: 'UltraProChef',
  ingredients:['leche','canela'],
  cuisine:'Mexicana',
  dishType:'Dessert',
  image:'https://images.media-allrecipes.com/images/75131.jpg',
  duration:30,
  creator:'Mary',
  created:Date.now
});

console.log(Recipe.title);

Recipe.insertMany(data, function(error, docs) {
  console.log(Recipe.title);
});

Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });

Recipe.deleteOne({ title: 'Carrot Cake' }, function(err){
  console.log("item successfully removed")
});
 
  mongoose.connection.close();

  app.listen(3000, () => console.log("http://localhost:3000"));
