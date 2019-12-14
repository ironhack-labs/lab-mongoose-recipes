import mongoose from 'mongoose'
import dot from 'dotenv'
dot.config()

import Recipe from './models/Recipe.mjs'
import data from './data.mjs'

// Connection to the database "recipeApp"
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@datacluster-my6rl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



