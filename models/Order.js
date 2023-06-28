const mongoose = require('mongoose');
const {Schema} = mongoose;
const OrderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    foods: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentInfo: {
        type: Object,
        required: true
    },
    status: {
        type: String, 
        default: "processing", 
        required: true
    },
    paymentState: {
        type: String, 
        default: "pending", 
        required: true
    },
});
mongoose.models = {}
const Order = mongoose.model('Order', OrderSchema)
module.exports = Order;