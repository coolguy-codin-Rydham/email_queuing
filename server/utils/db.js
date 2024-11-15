import mongoose from "mongoose";

export const connectMongo = (url) =>{
    mongoose.connect(url).then(()=>{
        console.log("MongoDB Connected")
    }).catch((err)=>{
        console.error(err.message)
    })
}
