//importando o mongoose do npm
const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

//conexao com o banco
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
    //dropDatabase deleta todos os dados do banco
  })
  .then(async () => {
    //quando mexer com o async o metodo () precisa ser async (async ())
    try{
      // Interation 2
      const resultCreate = await Recipe.create({
        title: "Camarao ao Molho",
        ingredients: ['Camarao', 'Tomate'],
        cuisine: 'Haute',
        dishType: 'snack',
        duration: 120
      });
      console.log('Recipe created! => ', resultCreate.title)

       // Interation 3
      const resultManyRecipe = await Recipe.insertMany(data);
      resultManyRecipe.map(result => console.log(result.title))

       // Interation 4
      const updateRigatoni = await Recipe.updateOne(
        {title: 'Rigatoni alla Genovese'},
        {duration: 100}
      );
      const findUpdatedDoc = await Recipe.find({title: 'Rigatoni alla Genovese'})
      console.log(`Sucessfully updated document with title ${findUpdatedDoc[0].title} to duration ${findUpdatedDoc[0].duration} `)
      // console.log(`Updated Rigatoni!!`, updateRigatoni)

      // Interation 5
      const deleteCake = await Recipe.deleteOne({title: 'Carrot Cake'});
      console.log(`Deleted Cake! Status: ${!!deleteCake.ok}, Documents matched: ${deleteCake.n}, Documents deleted: ${deleteCake.deletedCount}`)
    
      // Interation 6
      await mongoose.disconnect()

    } catch (err) {
      console.error(err)
    }
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

