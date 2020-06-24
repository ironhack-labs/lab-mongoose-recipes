const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model');

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
    console.log(`Connected to the database: '${self.connection.name}'`);
   
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
   
    // Run your code here, after you have insured that the connection was made
    Recipe
      .create({
        title: 'patatas a la pobre',
        level: 'Easy Peasy',
        ingredients: ['patatas', 'cebolla', 'aceite', 'sal y ajo'],
        dishType: 'breakfast',
        image: 'alguna imagen',
        duration: 15,
        creator: 'Meli'
  })
 
  .then(newRecipe => console.log('new Recipe:', new.title))
  .catch(error => console.log('An error has occured', err))
    
  //Recetas del data.json
  
    Recipe
    .create(data)
    .then(newData => console.log('My Recipe is:', newData))
    .catch(err=> console.log('An error has occured', err))

    .then(()=>
     
    Recipe.findOneAndUpdate({
       title: 'Rigatoni alla Genovese'
     }, {
       duration: 100
     }, {
       new: true
     })
    )

   .then(updatedRecipe => console.log('Recipe', updateRecipe.title, 'New duration', updatedRecipe.duration))

    .then(() =>
      Recipe.deleteOne({
      title: "Carrot Cake"
    })
   )
  .then(updateRecipe => console.log('Removed.', updatedRecipe))

  .then(()=> mongoose.connection.close(()=>
   console.log('Mongoose Disconect')))


    .catch(error => {
  console.error('Error connecting to the database', error);
});
