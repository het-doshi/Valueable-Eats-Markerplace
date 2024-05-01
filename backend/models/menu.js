import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    owner : {type: mongoose.Schema.Types.ObjectId, ref: "Owner"},
    city : String,
    restaurant: String,
    rating: String,
    address: String,
    cuisine: String,
    menu: String,
    item: String,
    price: Number,
    image: String,
}) 

export default mongoose.model('dish', menuSchema);