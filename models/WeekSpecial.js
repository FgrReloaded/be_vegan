const mongoose = require('mongoose');
const {Schema} = mongoose;
const WeekSpecialSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    foodId: {
        type: String,
        required: true,
        unique: true
    },
    date:{
        type: String,
        required: true
    }
});
mongoose.models = {}

const WeekSpecial = mongoose.model('WeekSpecial', WeekSpecialSchema)
module.exports = WeekSpecial;