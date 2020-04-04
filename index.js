const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model.js');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
mongoose.set('useFindAndModify', false);

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
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      "title": "BLAH!",
      "level": "Amateur Chef",
      "ingredients": [
        "NOTHING",
        "5 honey",
        "1/3 OF LOVE",
      ],
      "cuisine": "Asian",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 40,
      "creator": "Chef LePapu"
  
    }).then((recipe)=>{
      console.log('Title of the Recipe is:',recipe.title);
    });
  
    Recipe.insertMany(data).then((manyRecipes)=>{
      //console.log(manyRecipes)
      Recipe.findOneAndUpdate(
        {title:'Rigatoni alla Genovese'},
        {duration:100}
        ).then((durationChanged)=>{
          console.log('Change:',durationChanged);
        });
        Recipe.deleteOne(
          {title:'Carrot Cake'}
        ).then(()=>{
          console.log("Carrot is deleted")
          mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
        });
        });
    });

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  
