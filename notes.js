  // Notes
// Create a schema

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true
  },
  author: {
    type: String,
    maxLength: 50
  },
  genre: {
    type: String,
    // Only genres in the array will be allowed
    enum: ["fantasy", "sci-fi"]
  }
}, {timestamps: true})

// Create a model

const Book = mongoose.model("Book", bookSchema)

//Connect to the database

mongoose.connect("mongodb+srv://mongo-ib:capybara@cluster0.xifx6un.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("Connected to the cloud"))
.catch(err => console.log(err))

Book.create({title: "First book"})
.then(book => console.log(book))
.catch(err => console.log(err))

Book.create({title: "Second book"})
.then(book => console.log(book))
.catch(err => console.log(err))

Book.find({title: "First book"}) // or .findOne, .findById
.then(book => console.log(book))
.catch(err => console.log(err))
