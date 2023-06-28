const mongoose = require('mongoose');
const {Schema} = mongoose;
const CartSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    foods: {
        type:Array,
        required: true
    },
    subTotal: {
        type: String,
        required: true
    }
});
mongoose.models = {}
const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart;