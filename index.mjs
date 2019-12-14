import mongoose from 'mongoose'
import dot from 'dotenv'
dot.config()

import Recipe from './models/Recipe.mjs'
import data from './data.mjs'

// Connection to the database "recipeApp"
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@datacluster-my6rl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    doTheThing()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });






async function doTheThing() {
  await createOne()
  await createMany()
  await updateOne()
  await deleteOne()
  // closeDB()
}

function createOne(){
  return Recipe.create({
    title: 'Buebito con catsun',
    level: 'UltraPro Chef',
    ingredients: ['buebito', 'catsun'],
    cuisine: 'Barrio',
    dishType: 'Other',
    image: 'https://pbs.twimg.com/profile_images/1064383011154739200/xddwcdz3_400x400.jpg',
    duration: 5,
    creator: 'Chef Servín'
  })
}

function createMany(){
  return Recipe.insertMany(data)
}
function updateOne(){
  return Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration: 100});
}
function deleteOne() {
  return Recipe.deleteOne({title: 'Carrot Cake'})
}

function closeDB(){
  mongoose.connection.close()
}