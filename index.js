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
    console.log(`# Connected to the database: '${self.connection.name}'`);
    return self.connection.dropDatabase();
  })
.then(()=>{
    // Iteration 2
    (async()=> {
    try {
        const newRecipe = {
        "title": "Omelette",
        "level": "Amateur Chef",
        "ingredients": [
            "4 Eggs",
            "Oil",
            "Salt",
            "1 Kg. Potatos",
        ],
        "cuisine": "Spanish",
        "dishType": "main_course",
        "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        "duration": 35,
        "creator": "Chef JohnDoe"
        };
        const recipe = await Recipe.create(newRecipe);
        console.log(`# '${recipe.title}' has been created and added to the database`);
        // Iteration 3
        (async()=>{
            try {
            const recipes = data;
            const insert = await Recipe.insertMany(recipes);
            console.log(`# ${insert.length} new recipes have been added to the database.`);
            // Iteration 4
            ( async ()=> {
                try {
                const query = { title: "Rigatoni alla Genovese" };
                const update = await Recipe.findOneAndUpdate(query,{ $set: { duration: 100 }}, {new: true});
                console.log(`# ${query.title}: duaration changed to `, update.duration);
                // Itereation 5
                (async()=>{
                    try {
                    const query = {title: "Carrot Cake"};
                    const del = await Recipe.deleteOne(query);
                    console.log(`# Successfully deleted: `, query.title);
                    // Iteration 6
                    (async()=>{
                        try{
                            mongoose.connection.close();
                            console.log('# Connection closed');
                        } catch (error){
                            console.log('# Error disconnecting from database.')
                        }
                    })();
                    } catch (error) {
                    console.log(error);
                    }
                })();
                } catch (error) {
                console.log(error);
                }
            })();
            } catch (error) {
            console.log(error);
            }
        })();
    } catch (error) {
        console.log(error);
    }
    })();
})
.catch(error => {
console.error('Error connecting to the database', error);
});