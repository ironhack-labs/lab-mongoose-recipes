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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipe = { title: 'Nova Receita', level: 'Easy Peasy', ingredients: ['açucar', 'farinha'], cuisine:'French',dishType: 'breakfast', duration: 50, creator: 'Rodrigo' };

    const promise1 = Recipe.create(recipe)
    .then(user => console.log(`Título da Receita: ${recipe.title}`))
    .catch(error => console.log('An error happened while saving a new user:', error));

    const recipes = require('./data.json');

    const promise2 = Recipe.insertMany(recipes)
    .then(function(recipe) {
      for(let i=0;i < recipe.length;i++){
        console.log(`Título da Receita: ${recipe[i].title}`)
      }
    })
    .catch(error => console.log('An error happened while saving a new user:', error));

    const promise3 = Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration:100})
    .then(recipe => console.log(`Atualização efetuada com sucesso!`))
    .catch(error => console.log('An error happened while saving a new user:', error));

    const promise4 = Recipe.deleteOne({title: 'Carrot Cake'})
    .then(result => console.log(`Registro removido com sucesso!`))
    .catch(err => console.error(`Erro na exclusão do registro!`))    

    Promise.all([promise1, promise2, promise3, promise4])
    .then(values => {
      console.log('Conexão Encerrada');
      mongoose.connection.close();
    })
    .catch(err => console.error(err));

  });
