function createRecipe(Recipe) {
    const recipesData = 
      {
        title: "Pão de Queijo",
        level: "Easy Peasy",
        ingredients: ["1/4 cup whole milk", "1/4 cup vegetable oil", "1 tsp. salt", "2 cups cassava flour or tapioca flour", "2 eggs", "1.5 cups parmesan cheese"],
        cuisine: ["Brazilian"],
        dishType: "breakfast",
        image: 'https://p2.trrsf.com/image/fget/cf/942/530/images.terra.com/2022/07/01/31650768-shutterstock1268210182-768x575.jpg',
        duration: 45,
        creator: ["Marcela"],
        created: new Date('2023-06-23')
      };
  
    return Recipe.create(recipesData); 
  }
  
  module.exports = { createRecipe };
  

