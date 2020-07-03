const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

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
      .then(async () => {

        try {
          const pizza = await Recipe.create({
            title: 'Pizza Napolitana',
            level: 'Easy Peasy',
            ingredients: ['pre-made pizza base', 'mossarela cheese', 'tomato sauce', 'fresh basil leaves'],
            cuisine: 'Italian',
            dishType: 'main_course',
            image: 'https://super.abril.com.br/wp-content/uploads/2017/12/processo-de-confecc3a7c3a3o-da-pizza-napolitana-vira-patrimc3b4nio-da-unesco.png',
            duration: 40,
            creator: 'Rodrigo Sena',
            }) 
          console.log(pizza)

          // iteration 3

          const importArray = await Recipe.insertMany(data)
          console.log(importArray)

          // iteration 4
          
          const updateOne = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {$set: {duration: 100 }}, {new: true})
          console.log(updateOne)


          //iteration 5

          const deleteCarrot = await Recipe.deleteOne({ title: 'Carrot Cake' })
          console.log('Carrot Cake sadly deleted! \:\(')
        
          // iteration 6

          const disconnectMongoose = await mongoose.disconnect()
          console.log('Database is closed! Grab a beer now! :)')
    
        } catch (error) {

          console.log(error)
        }

        }) 
      .catch(error => console.log(error))

  .catch(error => {
    console.error('Error connecting to the database', error);


  });

