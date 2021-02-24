const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const rougailRecipe=   {title: "Rougail Saucise",
level: "Easy Peasy",
ingredients: [
"3 tomates",
"1 tablespoon curcuma",
"2 sausages",
],
cuisine: "Créole",
dishType: "main_course",
image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
duration: 160,
creator: "Thaïs"}


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

    //--itération 2
    Recipe.create(rougailRecipe)
    .then (recipe => console.log('the recipe is saved and its name is', recipe.title))
    .catch(error=>console.log('An error happened', error))

    //--itération 3/4/5/6
    Recipe.create(data)
    .then (recipearr => {
      recipearr.forEach((recipe)=> console.log('the recipe is saved and its name is', recipe.title))    })
      .then(()=>{
        Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, { duration: 100 } )
        .then (recipe=>console.log('this recipe has been updated:', recipe.title))
          .then(()=>{
            Recipe.deleteOne({ title: 'Carrot Cake' })
            .then (recipe => console.log('the recipe has been deleted', recipe))
              .then(()=>mongoose.connection.close()              ) 
            .catch(error=>console.log('An error happened', error))
          })
        .catch(error=>console.log('An error happened', error))
      })
    .catch(error=>console.log('An error happened', error))

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })
