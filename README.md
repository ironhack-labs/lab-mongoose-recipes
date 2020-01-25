![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Mongoose Recipes

## Introduction

![thai_style_chicken_noodle_soup_pieces_recipe_web](https://user-images.githubusercontent.com/23629340/38369283-ac1bda62-38e7-11e8-9c9b-d9df623f1bc3.jpg)

We learned how to use Mongoose to create Schemas and then interact with our MongoDB database. In the following exercise, we will practice how to implement this by creating awesome recipes.

## Requirements

- Fork this repo
- Clone this repo

## Submission

- Upon completion, run the following commands:

  ```
  git add .
  git commit -m "done"
  git push origin master
  ```

- Create Pull Request so your TAs can check up your work.

## Instructions

### Iteration 1 - Recipe Schema

Create a `Recipe` model inside the file `/models/Recipe.model.js`. The schema should have the following fields:

- **title** - type `String`. It should be required and unique.
- **level** - type `String`. Only can be one of the following values: _Easy Peasy_ - _Amateur Chef_ - _UltraPro Chef_ (remember the ENUM :wink:)
- **ingredients** - type `Array`.
- **cuisine** - type `String`. Should be required.
- **dishType** - type `String`. Possible values: _Breakfast_ - _Dish_ - _Snack_ - _Drink_ - _Dessert_ - _Other_.
- **image** - type `String`. Default value: _https://images.media-allrecipes.com/images/75131.jpg_.
- **duration** - type `Number`. Min value should be 0.
- **creator** - type `String`
- **created** - type `Date`. By default today.

### Iteration 2 - Create a recipe

In `index.js`, using the [`Model.create`](https://mongoosejs.com/docs/api.html#model_Model.create) method, you should pass the info to create a new recipe. After the creation, you can use MongoDB Compass to check everything went ok. After inserting the recipe, `console.log` the `title` of the recipe.

**To run your code, remember you should use:**

```shell
$ node index.js
```

### Iteration 3 - Insert multiple recipes

We are importing an array of recipes form the `data.js` file. Using the [`Model.insertMany`](https://mongoosejs.com/docs/api.html#model_Model.insertMany) method, you should add that entire array to the database. After inserting the elements, print on the console the title of each recipe.

### Iteration 4 - Update recipe

Now you should have six different recipes in the database, but there was a mistake in one of them. The **Rigatoni alla Genovese** does not take that long. You should update the `duration` field and set it to **100**. After updating it, print a success message!

### Iteration 5 - Remove a recipe

Oh oh! The `Carrot Cake` is no longer available, so we need to remove it from the database. Using the [`Model.deleteOne`](https://mongoosejs.com/docs/api.html#model_Model.deleteOne) method, remove that recipe from the database and display a success message after doing it!

### Iteration 6 - Close the Database

After doing all the task you should close the database. Otherwise, the connection will keep open. Be careful about the asynchronicity of all process; you should close it after everything is done! :wink:

Happy coding! :heart:
