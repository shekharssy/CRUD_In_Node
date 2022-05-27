const mongoose = require('mongoose');
var uuid = require('uuid');

const ReviewSchema = mongoose.Schema({
    userid:String,
    description: String,
    _id:{ type: String, default: function genUUID() {
        return uuid.v1()
    }}
},{
    timestamps: true
});

module.exports = mongoose.model('Review',ReviewSchema);