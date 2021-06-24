const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const RecipeModel = require('./models/Recipe.model');
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
    console.log(`Connected to the database: "${self.connection.name}`);
    // Before adding any recipes to the database, let's remove all existing ones
    return RecipeModel.deleteMany()
  })
  .then(() => {
    lobster = {
      "title": "Lobster Telephone",
      "level": "Easy Peasy",
      "ingredients": [
        "1 lobster, cooked",
        "1 telephone",
        "1 international reputation as a renowned abstract artist",
        "opium, to taste.",
      ],
      "cuisine": "Abstract",
      "dishType": "other",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Lobster_Telephone_Photo.jpg/640px-Lobster_Telephone_Photo.jpg",
      "duration": 10,
      "creator": "Salvador Dali"
    }
    RecipeModel.create(lobster)
    return RecipeModel.insertMany(data)
  })
  
  .then((responseFromInsertMany) =>{
    for (let recipe of responseFromInsertMany) {
      console.log(recipe.title)
    }
    return RecipeModel.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
  })
  
  .then((findResult) => {
        console.log('Should be 100:',findResult.duration)

    return RecipeModel.deleteOne({title: 'Carrot Cake'}, function (err){
          if (err) return handleError(err)
        })
  })
  .then((deleteOneResponse) => {
    RecipeModel.countDocuments({}, (error,count) => console.log(`win`,error, count))
    
    mongoose.connection.close()
  })
      
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  