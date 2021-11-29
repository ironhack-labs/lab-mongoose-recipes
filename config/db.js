const mongoose = require('mongoose')
const connectDB = async()=> {
    await mongoose.connect('mongodb://localhost:27017/recipe-app',{
        useNewUrlParser: true,
	useUnifiedTopology: true,
    useCreateIndex:true
    })
    console.log('Base de Datos conectada');
    
}

module.exports = connectDB