import mongoose, { Schema } from 'mongoose'


const userSchema = new Schema({
    username:{type :String,
    required: true,
unique:true},
bio: {type:String},

age:{type:Number} ,
email:{type:String,
required:true,
unique:true},
isChef:{type: Boolean, default:false},
recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }]
})

const User = mongoose.model('User', userSchema)

export default User