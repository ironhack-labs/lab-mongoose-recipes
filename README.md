![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Mongoose Recipes

## Introduction

![thai_style_chicken_noodle_soup_pieces_recipe_web](https://user-images.githubusercontent.com/23629340/38369283-ac1bda62-38e7-11e8-9c9b-d9df623f1bc3.jpg)

We've learned how to use Mongoose to create Schemas and then interact with our MongoDB database. In the following exercise, we will practice how to implement this by creating awesome recipes.

## Requirements

- Fork this repo
- Clone this repo

## Submission

- Upon completion, run the following commands:

  ```shell
  git add .
  git commit -m "Completed lab"
  git push origin master
  ```

- Create Pull Request so that the TAs can check your work.

## Instructions


### Iteration 0: Initial setup

To run the application, the first thing you have to do is install all of its dependencies. Run the following command:

```shell
npm install
```



### Iteration 1 - Recipe Schema

Create a `Recipe` model inside of the file `/models/Recipe.model.js`. The schema should have the following fields:

- **title** - Type `String`. It should be required and unique.
- **level** - Type `String`. Can be one of the following values: _Easy Peasy_ - _Amateur Chef_ - _UltraPro Chef_ (remember the `enum` validator :wink:).
- **ingredients** - Type `Array` of `String`s (represented as `[ String ]`).
- **cuisine** - Type `String`. Should be required.
- **dishType** - Type `String`. Possible values: _breakfast_, _main_course_, _soup_, _snack_, _drink_, _dessert_ or _other_.
- **image** - Type `String`. Default value: _"https://images.media-allrecipes.com/images/75131.jpg"_.
- **duration** - Type `Number`. The minimum value should be 0.
- **creator** - Type `String`.
- **created** - Type `Date`. By default, today.



### Iteration 2 - Create a recipe

In the `index.js`, we first connect to the database using `mongoose.connect()` and following the connection we call the method `Recipe.deleteMany()` to remove any existing documents from the recipes collection:

```js
// ...

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
// ...
```



Then, you should add a new recipe document to the database by calling the [`Model.create`](https://mongoosejs.com/docs/api.html#model_Model.create) method and passing it the recipe details as an object. After inserting the recipe, you should `console.log` the `title` of the recipe.

You can use MongoDB Compass to double-check that everything is working as intended.

**To run your code, remember you should use:**

```shell
node index.js
```



### Iteration 3 - Insert multiple recipes

We are importing an array of recipes from the `data.json` file. Using the [`Model.insertMany`](https://mongoosejs.com/docs/api.html#model_Model.insertMany) method, you should add the entire array to the database. After inserting the documents, print the title of each recipe to the console.

Tip: Follow the same tip as in the previous step.



### Iteration 4 - Update recipe

Now you should have six different recipes in the database, but there was a mistake in one of them. The **Rigatoni alla Genovese** does not take that long. You should update the `duration` field and set it to **100**. You might want to use the [`Model.findOneAndUpdate`](https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate) method. After updating it, print a success message!



### Iteration 5 - Remove a recipe

Oh oh! The `Carrot Cake` is no longer available, so we need to remove it from the database. Using the [`Model.deleteOne`](https://mongoosejs.com/docs/api.html#model_Model.deleteOne) method, remove that recipe from the database and display a success message after doing it!



### Iteration 6 - Close the Database

As the last step, you need to close the database. Otherwise, the connection will stay open until the Node.js process dies. Pay attention to the asynchronicity of the operation. You should only close the connection after everything is done! :wink:

Happy coding! 💙
