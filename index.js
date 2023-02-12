//mongooseをインポートする
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

//'Recipe.model.js'ファイルから"Recipe"モデルをインポートする
const Recipe = require('./models/Recipe.model')

//'data.json'ファイルからデータをインポートする
const data = require('./data')
const { findOne } = require('./models/Recipe.model')

//mongodbのポートの読み込みと、mongoDBのコレクション名(recipe-app)を探す。ない場合は新規に作成する
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

// データベース"recipe-app"と接続設定
mongoose
  //mongodbのポートと接続
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`)
    //データベースにレシピを追加する前に、既存のレシピをすべて削除する
    return Recipe.deleteMany()
  })
  .then(async (x) => {
    //Iteration 2 - Create a recipe//新レシピを追加しよう
    const Curry = await Recipe.create({
      title: 'Curry a la Romi',
      level: 'Amateur Chef',
      ingredients: [
        '3 potatos',
        '2 carrots',
        '2 cup of water',
        '2 soupspoons curry powder',
      ],
      cuisine: 'Indian',
      dishType: 'main_course',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 60,
      creator: 'Chef Romi',
      created: new Date(),
    })
    //Iteration 3 - Insert multiple recipes//JSONデータからデータを取り込もう
    const allRecipe = await Recipe.insertMany(data)
    console.log(allRecipe)

    //Iteration 4 - Update recipe//データを更新しよう
    const rigatoniDurationUpdate = await Recipe.findOneAndUpdate(
      {
        title: 'Rigatoni alla Genovese',
      },
      {
        duration: 100,
      },
      { new: true }
    )
    await rigatoniDurationUpdate.save()
    console.log('rigatoni after duration updates:', rigatoniDurationUpdate)

    //Iteration 5 - Remove a recipe//データを削除しよう
    const carrotCake = await Recipe.findOne({
      title: 'Carrot Cake',
    })
    await Recipe.deleteOne(carrotCake)
    // console.log(allRecipe)
  })
  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
  //Iteration 6 - Close the Database//データベースをクローズしよう
  .finally(() => {
    mongoose.connection.close()
  })
