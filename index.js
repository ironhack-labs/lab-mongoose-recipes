const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')

// Import of the data from './data.json'
const data = require('./data')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

// Connection to the database "recipe-app"
mongoose
	.connect(MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`)
		// Before adding any recipes to the database, let's remove all existing ones
		return Recipe.deleteMany()
	})
	.then(() => Recipe.syncIndexes())
	.then(() => {
		// Run your code here, after you have insured that the connection was made
		//return Recipe.create({ title: 'tortilla', level: 'Easy Peasy', ingredients: ['patata', 'sal', 'cebolla', 'aceite'], cuisine: 'Esp' })
		return Recipe.create(data)
	})
	.then((result) => console.log(`Array of Data with length of : ***${result.length}*** created in Db`))
	.then(() => {
		return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
	})
	.then((result) => {
		return console.log(result.nModified === 1 ? "successfully Updated the target Recipe ['Rigatoni alla Genovese'] duration to 100" : 'Some thing wen wrong')
	})
	.then(() => {
    //FIXME nested Promises :
    //Sorry for nested promises, it  didnt work the other way
		mongoose.connection
			.close()
			.then(() => console.log('Connection Closed ending ....'))
			.catch((err) => {
				console.log("Couldn't close the conection exit with error : ", err)
			})
	})

	.catch((error) => {
		console.error('Error connecting to the database', error)
	})
function getConection(){
  if(mongoose.connection.readyState!==1)
  {
    return mongoose.connect.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  }
}
function update(expression, obj) {
	return db.findOneAndUpdate(expression, obj)
}
function add(obj){

}
