const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },
    description : {
        type : String,
    },
    price : {
        type : Number,
        required : true,
        min : 0,
    }
});

module.exports = mongoose.model('tem', menuItemSchema)