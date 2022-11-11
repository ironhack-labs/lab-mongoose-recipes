// const mongoose = require("mongoose")

// // First we create a schema
// // const bookSchema = mongoose.Schema({
// //     title: String,
// //     author: String,
// //     pages: Number,
// //     released: Date
// // })

// // More complex schema
// const bookSchema = mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     author: {
//         type: String,
//         maxLength: 50
//     },
//     pages: {
//         type: Number,
//         max: 7000
//     },
//     inStock: {
//         type: Boolean,
//         default: true
//     },
//     genre: {
//         type: String,
//         enum: ["fantasy", "drama", "crime", "thriller", "romance"]
//     },
//     released: Date
// }, { timestamps: true })

// const Book = mongoose.model("Book", bookSchema)

// mongoose.connect("mongodb://localhost:27017/mongoose-intro")
// .then(() => console.log("connected to mongoDB"))
// .catch(err => console.log(err))

// // CRUD-operations: Create, Read, Update, Delete

// // Create

// // Create one book
// // Book.create({title: "First book"})
// //     .then(createdBook => console.log(createdBook))
// //     .catch(err => console.log(err))

// // Book.insertMany([
// //     { title: "Sixth book" },
// //     { title: "Seventh book" }
// // ])
// //     .then(createdBooks => console.log(createdBooks))
// //     .catch(err => console.log(err))

// // Read

// // Book.find()
// //     .then(allBooks => console.log("ALL BOOKS :D ", allBooks))
// //     .catch(err => console.log(err))

// // Book.find({title: "First book"})
// //     .then(book => console.log(book))
// //     .catch(err => console.log(err))

// // Book.findOne({title: "First book"})
// //     .then(book => console.log(book))
// //     .catch(err => console.log(err))

// // Book.findById("636e25846ae3165a2ce61f14")
// //     .then(book => console.log(book))
// //     .catch(err => console.log(err))

// // Update

// // Book.findOneAndUpdate({ title: "First book" }, { author: "Third author" })
// //     .then(book => console.log(book))
// //     .catch(err => console.log(err))

// // Book.findByIdAndUpdate("1", {data to update})

// // Delete
// Book.findOneAndDelete({ title: "First book"})
//     .then(deletedBook => console.log(deletedBook))
//     .catch(err => console.log(err))

// // Book.findByIdAndDelete("id")

// // const userSchema = new Schema({
// //     linkedinProfile: {
// //         type: String,
// //         validate: {
// //             validator: (text) => {
// //                 return text.indexOf("https://www.linkedin.com") === 0 ||
// //                 text.indexOf("www.linkedin.com") === 0
// //             }
// //         }
// //     }
// // })

// const userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         set: value => {
//            return value
//             .split(" ")
//             .map(str => str[0].toUpperCase() + str.slice(1).toLowerCase())
//             .join(" ") 
//         }
//     }
// })

// const User = mongoose.model("User", userSchema)

// User.create({name: "mAtIaS gObBi"})
//     .then(user => {
//         console.log(user)
//     })
//     .catch(err => console.log(err))

