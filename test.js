
Recipe.create(recipe)
.then((recipe) => {
  console.info('========== Iteration 2');
  console.info('- Created recipe', recipe.title);
  return Recipe.insertMany(recipes)
})
.then((recipes) => {
  console.info('========== Iteration 3');
  for (let recipe of recipes) {
    console.info('- Created recipe', recipe.title);
  }
  return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } }, { new: true });
})
.then((recipe) => {
  console.info('========== Iteration 4');
  console.info(`${recipe.title} successfully updated!`);
  return Recipe.findOneAndRemove({ title: 'Carrot Cake' });
})
.then((recipe) => {
  console.info('========== Iteration 5');
  console.info(`${recipe.title} successfully removed!`);
})
.catch(error => console.error(error))
.then(() => {
  console.info('========== Cleaning database...');
  return mongoose.connection.dropDatabase();
})
.then(() => {
  console.info('========== Closing database...');
  return mongoose.connection.close()
})
.catch(error => console.error(error));
/* 
Now you should have six different recipes in the database, but there was a mistake in one of them. 
The Rigatoni alla Genovese does not take that long. You should update the duration field and set it to 100. 
After updating it, print a success message!

Iteration 5 - Remove a recipe
Oh oh! The Carrot Cake is no longer available, so we need to remove it from the database. 
Using the Model.remove method, remove that recipe from the database and display a success 
message after doing it!

Iteration 6 - Close the Database
After doing all the task you should close the database. Otherwise, the connection will keep open. 
Be careful about the asynchrony of all process; you should close it after everything is done! wink 
*/