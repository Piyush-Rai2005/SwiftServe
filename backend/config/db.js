import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nishan10:NishanFoodApp@cluster0.e91mqdg.mongodb.net/food-del').then(()=>{
        console.log("DB connected");
    })
}