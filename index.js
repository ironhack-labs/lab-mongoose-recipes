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
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    (async () => {
      try {
        // iteraction 2
        let create1 = await Recipe.create(data[0]);
        console.log('create one', create1.title);
        // iteraction 3
        let createMany = await Recipe.insertMany(data);
        createMany.forEach((recipe) => console.log(recipe.title));
        // iteraction 4
        await Recipe.findOneAndUpdate(
          { title: 'Rigatoni alla Genovese' },
          { duration: 100 },
          { useFindAndModify: false }
        );
        console.log('findOneAndUpdate done');
        // iteraction 5
        await Recipe.deleteOne({ title: 'Carrot Cake' });
        console.log('deleteOne done');
        // iteraction 6
        mongoose.connection.close();
      } catch (error) {
        console.error('Error running one of the iteraction', error);
      }
    })();
  })
  /* .then(() => {
    // testing with Promise.all() -> produces undesired result --> since it does not wait for the previous to finish

    Promise.all([
      Recipe.create(data[0])
        .then((recipe) => {
          console.log(recipe.title);
          return 'create done';
        })
        .catch((err) => {
          console.log(err);
          return 'create error';
        }),
      Recipe.insertMany(data)
        .then((recipes) => {
          recipes.forEach((recipe) => console.log(recipe.title));
          return 'insertMany done';
        })
        .catch((err) => {
          console.log(err);
          return 'insertMany error';
        }),
      Recipe.findOneAndUpdate(
        { title: 'Rigatoni alla Genovese' },
        { duration: 100 },
        { useFindAndModify: false }
      )
        .then(() => {
          console.log('findOneAndUpdate sucess');
          return 'findOneAndUpdate done';
        })
        .catch((err) => {
          console.log(err);
          return 'findOneAndUpdate error';
        }),
      Recipe.deleteOne({ title: 'Carrot Cake' })
        .then(() => {
          console.log('deleteOne sucess');
          return 'deleteOne done';
        })
        .catch((err) => {
          console.log(err);
          return 'deleteOne error';
        }),
    ]).then(() => {
      mongoose.connection.close();
    });
  })
*/
  /*  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // iteraction 2 ???? I am not getting an duplicate keys error
    Recipe.create(data[0])
      .then((recipe) => {
        console.log(recipe.title);
      })
      .catch((err) => {
        console.log(err);
      });

    // iteraction 3
    Recipe.insertMany(data)
      .then((recipes) => {
        recipes.forEach((recipe) => console.log(recipe.title));
        // iteraction 4
        Recipe.findOneAndUpdate(
          { title: 'Rigatoni alla Genovese' },
          { duration: 100 },
          { useFindAndModify: false }
        )
          .then((_) => {
            console.log('findOneAndUpdate sucess');
            // iteraction 5
            Recipe.deleteOne({ title: 'Carrot Cake' })
              .then((_) => {
                console.log('deleteOne sucess');
                // iteraction 6
                mongoose.connection.close();
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  })
*/
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

async function runMongooseInOrder() {
  // iteraction 2
  let create1 = await Recipe.create(data[0]);
  console.log('create one', create1.title);
  // iteraction 3
  let createMany = await Recipe.insertMany(data);
  createMany.forEach((recipe) => console.log(recipe.title));
  // iteraction 4
  await Recipe.findOneAndUpdate(
    { title: 'Rigatoni alla Genovese' },
    { duration: 100 },
    { useFindAndModify: false }
  );
  console.log('findOneAndUpdate done');
  // iteraction 5
  await Recipe.deleteOne({ title: 'Carrot Cake' });
  console.log('deleteOne done');
  // iteraction 6
  return mongoose.connection.close();
}
