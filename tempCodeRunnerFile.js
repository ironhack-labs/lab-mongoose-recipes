Commented out so no duplicates will be created
    Recipe.create(dataFirst)
      .then((recipe) =>
        console.log("The recipe is saved and its value is: ", recipe)
      )
      .catch((error) =>
        console.log("An error happened while saving a new user:", error)
      );