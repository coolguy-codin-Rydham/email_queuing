import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String, 
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
    },
    gender:{
        type:String,
    },
    profilePicture:{
        type:String,
    },
})

const UserModel = mongoose.model("User", userSchema)

export default UserModel