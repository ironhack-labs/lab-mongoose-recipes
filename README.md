![Ironhack logo](https://i.imgur.com/1QgrNNw.png)

# Mongoose Recipes

## Requirements:

- [Fork this repo](https://guides.github.com/activities/forking/).
- Clone your fork into your `~/code/labs` folder.

---

## Introduction:

![thai_style_chicken_noodle_soup_pieces_recipe_web](https://user-images.githubusercontent.com/23629340/38369283-ac1bda62-38e7-11e8-9c9b-d9df623f1bc3.jpg)

We learned how to use Mongoose to create Schemas and then interact with our MongoDB database. In the following exercise, we will practice how to implement what we learned by creating recipes.

---

## Deliverables:

### Iteration 1 - Recipe Schema

The `recipes.js` file already connects to the **recipesApp** database. Now we need to create a `Recipe Schema`. The schema should have the following fields:

- **title**. Type `String`. It should be *required* and unique.
- **level**. Type `String`. Only can be one of the following values: *Easy Peasy* - *Amateur Chef* - *UltraPro Chef* (remember the ENUM :wink:)
- **ingredients**. Type `Array`.
- **cuisine**. Type `String`. Should be *required*.
- **dishType**. Type `String`. Possible values: *Breakfast* - *Dish* - *Snack* - *Drink* - *Dessert* - *Other*.
- **image**. Type `String`. Default value: *https://images.media-allrecipes.com/images/75131.jpg*.
- **duration**. Type `Number`. *Min* value should be 0.
- **creator**. Type `String`
- **created**. Type `Date`. By default *today*.

---

### Iteration 2 - Create a recipe

Using the `Model.create` method, you should pass the info needed to create a new recipe. After creation, you can use MongoDB Compass to check that it shows up in the database. After inserting the recipe into your database, `console.log` the `title` of the new recipe.

To run your code remember you should use **`node recipes.js`**.

---

### Iteration 3 - Insert Many recipes

From the `data.js` file we are importing an array of recipes. Using the `Model.insertMany` method, you should *add the entire array* to the database. After inserting the elements, `console.log` the `title` of each recipe.

---

### Iteration 4 - Update recipe

Now you should have six different recipes in the database. However, there was a mistake in one of them! The **Rigatoni alla Genovese** does not take that long to make. You should update the `duration` field and set it to **100**. After updating it, `console.log` a success message!

---

### Iteration 5 - Remove a recipe

Oh oh! The `Carrot Cake` is no longer available, so we need to *remove* it from the database. Using the `Model.remove` method, remove that recipe from the database and `console.log` a success message.

---

### Iteration 6 - Close the Database

After doing all the tasks you should *close* the database. Otherwise, the connection will stay open. :wink:

---

## Submission

Upon completion, run the following commands:

```bash
$ git add .
$ git commit -m "done"
$ git push origin master
```

Navigate to your repo and create a Pull Request -from your master branch to the original repository master branch.

In the Pull Request name, add your campus, name, and the last name separated by a dash "-".

---