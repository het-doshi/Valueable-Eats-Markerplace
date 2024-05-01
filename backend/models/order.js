import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    cart: [{
        city: String,
        foodItemId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true
        },
        Itemname: String,
        price: Number,
        quantity: String,
        _id: Schema.Types.ObjectId
    }],
    order_date: {
        type: Date,
        default: Date.now
    }
});

const OrderModel = model("Order", orderSchema);

export default OrderModel;
