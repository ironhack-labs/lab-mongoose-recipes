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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // inserindo receita de BRIGADEIRO
    Recipe
    .create([brigadeiro])
    .then(_ => console.log(brigadeiro.title))
    .catch(error => console.log(error))
    
    Recipe
    .insertMany(data)
    .then(receitas => {
      receitas.forEach(elem => console.log(elem.title, elem.duration, elem.id))
      
      // UPDATE
      Recipe
      .findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
      .then(response => {
        console.log(response)
        // DELETE
        Recipe
          .deleteOne({title: "Carrot Cake"})
          .then(response => {
            console.log(response)
            mongoose.disconnect()
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
  const brigadeiro = new Recipe({
    title: 'Brigadeiro',
    level: 'Easy Peasy',
    ingredients: ['leite consensado', 'achocolatado', 'manteiga'],
    cuisine: 'Brasileira',
    dishType: 'Desert',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAASABkDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUDBggC/8QAGAEAAgMAAAAAAAAAAAAAAAAABAUAAQP/2gAMAwEAAhADEAAAAUlX1ln5W3pdwl0XKR8gMTEmDIj/xAAeEAABBAIDAQAAAAAAAAAAAAADAQIEBQAGBxMXMv/aAAgBAQABBQJ3GFgA8qjnVZKrU5VwfyTO1M5HhGLY6DEIK07lxv2JqKpGNRc//8QAGBEAAgMAAAAAAAAAAAAAAAAAAAECEDH/2gAIAQMBAT8BwaVQP//EABoRAAICAwAAAAAAAAAAAAAAAAABAhEQITH/2gAIAQIBAT8BUr6ObvTwz//EAC0QAAEDAgIFDQAAAAAAAAAAAAEAAgMEERMiBRASMfEUITVBYXGRkpOx0eHw/9oACAEBAAY/AsSGtgy5mgXaShFpOTCjlacscocXfC5PTVkQjaMxN727l0mfR+0N6p6mFk8gMdnbLbtbbisSoE42WEMHV23W9nivL7I8w/NTbADhq//EAB8QAAICAgMAAwAAAAAAAAAAAAERACExcUGBoVHh8f/aAAgBAQABPyEkRkaOMC2BuFpkqgY6PmGLNUwuigz5mLI7v7jXMsmQBB4onqKTDwExotQfZ+Jg33EcEwqlFiI2hm8Z+Z//2gAMAwEAAgADAAAAEEAnIf/EAB0RAQABAwUAAAAAAAAAAAAAAAEAESExQXGBkcH/2gAIAQMBAT8Qo4y2U7Ya7Ew4PZ//xAAYEQEAAwEAAAAAAAAAAAAAAAABABARof/aAAgBAgEBPxBnigUcr//EACMQAQEAAgEDAwUAAAAAAAAAAAERACFBYXGREDFRobHB0fD/2gAIAQEAAT8QTVBhBLUI4qyVyb0rmNyCUlRuIDxsqNBtBkNTSijv6DtWex8E2P7H1xXhbi8RSkCHK7wy9qooIakCDqh4M/kvzhQhAjtf7cWYYUEdMNRtQzqPBnWec//Z',
    duration: 15,
    creator: 'Julia e Marcela'
  })
  
  

