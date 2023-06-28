const mongoose = require('mongoose');
const {Schema} = mongoose;
const TableSchema = new Schema({
    table: {
        type: Number
    },
    appoint: {
        type: Object,
    }
}, {timestamps: true});
mongoose.models={}
const Table = mongoose.model('Table', TableSchema)
module.exports = Table;