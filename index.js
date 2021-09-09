const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const uniqueRecipe = {
  "title": "Asian Glazed Chicken Thighs",
  "level": "Amateur Chef",
  "ingredients": [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "3 tablespoons minced garlic",
    "salt to taste",
    "8 skinless, boneless chicken thighs"
  ],
  "cuisine": "Asian",
  "dishType": "main_course",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  "duration": 40,
  "creator": "Chef LePapu"
}

async function deleteElement (food) {
  await Recipe.deleteOne({title: `${food}`}).then(response => console.log(response))
}

async function changeDuration (){
  await Recipe.updateMany({title: 'Rigatoni alla Genovese' }, {duration: 100} ).then(response => console.log(response))
}

async function returnTitle () {
  const recipesTitle = await Recipe.find(
    {},
    {title: 1, _id: 0}
  )
  recipesTitle.map((element) => console.log(element.title))
}

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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
  //   Recipe.create(uniqueRecipe).then((res) => {
  //     console.log(res.title)
  //   }).catch(error => console.error(error))
    Recipe.insertMany(data).then( res => {
      console.log(`Insert ${res.length} rows and titles:`)
      returnTitle()
      changeDuration()
      deleteElement('Carrot Cake')
      
    }).catch(err => console.error(err))
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  mongoose.connection.close(() => console.log('The conection is closed'))
