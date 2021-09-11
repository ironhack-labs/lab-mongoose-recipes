const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://arthur_melo:P4lmeiras2021@cluster0.jx5nn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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
    // Run your code here, after you have insured that the connection was made
    const recipe = { title: 'feijoada', ingredients: ['carne de porco', 'feijão preto', 'linguiça defumada', 'carne seca'], creator:'slaves', created:Date('1870')}

    Recipe.create(recipe)
      .then(recipe => console.log("A receita está salva no banco"))
      .catch(error => console.log("Um erro ocorreu na conexão"))
    
    Recipe.insertMany(data)
      .then(() => {console.log("Dados inseridos no banco")})
      .catch(() => {console.log("Erro no acréscimo")})

    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration:100})
      .then(() => {console.log("Alteração realizada no banco")})
      .catch(() => {console.log("Erro na atualização")})
    
    Recipe.deleteOne({title:"Carrot Cake"})
      .then(() => {console.log("Eliminação realizada no banco")})
      .catch(() => {console.log("Erro na eliminação")})
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
