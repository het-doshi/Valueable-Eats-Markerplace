import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    restaurantName: String,
    city:String,
    address:String
}) 

export default mongoose.model('blockOwner',ownerSchema);