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
    Recipe.create({
        title: "Crêpes",
        level: "Amateur Chef",
        ingredients: ["farine", "oeufs", "sucre", "huile", "beurre", "lait", "rhum"],
        cuisine: "French",
        dishType: "dessert",
        image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg-3.journaldesfemmes.fr%2FwQeFgucHiq17gshoWww70k9TkpM%3D%2F748x499%2Fsmart%2Fa5181741d55b4b3d8b54bda593ff87f5%2Frecipe-jdf%2F10021667.jpg&imgrefurl=https%3A%2F%2Fcuisine.journaldesfemmes.fr%2Frecette%2F333415-recette-de-crepes-la-meilleure-recette-rapide&tbnid=9tiCJbxY8Zk4PM&vet=12ahUKEwiWhYbrmOroAhVa04UKHSElDVUQMygAegUIARCsAg..i&docid=z8Z1U8UenuTgbM&w=748&h=499&q=recette%20crepes&ved=2ahUKEwiWhYbrmOroAhVa04UKHSElDVUQMygAegUIARCsAg",
        duration: 30,
        creator: "Guillaume M",
      }).then((dbResponse) => {
        Recipe.find().select({
          title: 1,
          _id: 0
        }).then((dbResponse) => {
          Recipe.insertMany(data).then((dbResponse) => {
            Recipe.find().select({
              title: 1,
              _id: 0
            }).then((dbResponse) => {
              console.log(dbResponse)
              Recipe.findOneAndUpdate({
                title: "Rigatoni alla Genovese"
              }, {
                duration: 100
              }, {
                new: true
              }).then((dbResponse) => {
                console.log(dbResponse)
                console.log("Update successful")
                Recipe.deleteOne({
                  title: "Carrot Cake"
                }).then((dbResponse) => {
                  console.log("Delete successful")
                  mongoose.disconnect().then(() => {
                    console.log("Disconnected")
                  }).catch((dbErr) => {
                    console.log(dbErr)
                  })
                }).catch((dbErr) => {
                  console.log(dbErr)
                })
              }).catch((dbErr) => {
                console.log(dbErr)
              })
            }).catch((dbErr) => {
              console.log(dbErr)
            })
            console.log(dbResponse)
          }).catch((dbErr) => {
            console.log(dbErr)
          });
          console.log(dbResponse)
        }).catch((dbErr) => {
          console.log(dbErr)
        })
        console.log(dbResponse);
      })
      .catch((dbErr) => {
        console.log(dbErr);
      });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });