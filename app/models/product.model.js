const mongoose = require('mongoose');
var uuid = require('uuid');
const ProductSchema = mongoose.Schema({
    name: String,
    price: Number,
    _id:{ type: String, default: function genUUID() {
        return uuid.v1()
    }}
},{
    timestamps: true
});

module.exports = mongoose.model('Product',ProductSchema);