import mongoose from "mongoose";
const salesSchema = new mongoose.Schema({
    owner : String,
    name: String,
    date: Date, 
    price: Number,
    quantity: Number, 
});

export default mongoose.model('Payment', salesSchema); 