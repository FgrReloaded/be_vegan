const mongoose = require('mongoose');
const {Schema} = mongoose;
const FoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type:String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Array,
        required: true
    }
});
mongoose.models = {}
const Food = mongoose.model('Food', FoodSchema)
module.exports = Food;