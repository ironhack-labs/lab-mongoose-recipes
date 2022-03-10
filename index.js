const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://atlasAbreu:Aa134625@cluster0.zhnvm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {

    Recipe.create({
      title: "pão de queijo",
      level: "Ultra Pro Chef",
      ingredients: ["queijo", "ovo", "polvilho", "leite", "mais queijo", "sal"],
      cuisine: "mineira",
      dishType: 'breakfast',
      //image: "", não passa imagem caso não tenha nenhuma para substituir, porque está como default
      duration: "25",
      creator: "Mineiros",
      // created: "", não passa porque está como default o date.now
    }).then(result => console.log(result.title))
      .catch(err => console.log(err))

      .then(async () => {
        const recipes = await Recipe.insertMany(data);
        return recipes.map(result => console.log(result.title))
      }).catch(err => console.log(err))

      .then(async () => {

        const query = { title: 'Rigatoni alla Genovese' }

        const result = await Recipe.findOneAndUpdate(query, { $set: { duration: 100 } });
        return console.log(`Alterado com sucesso ${result.title}`);
      }).catch(err => console.log(err))

      .then(async () => {
        await Recipe.deleteOne({ title: "Carrot Cake" })
        return console.log('Deletado com sucesso')
      }).catch(err => console.log(err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

