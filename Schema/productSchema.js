const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    categoryName:{
        type:String,
        required:true,
    },
    dateType:{
        type:String,
        required:true,
    },
    expiryDate:{
        type:String,
        required:true,
    },
    reminderDate:{
        type:String,
        required:true,
    }
})

const product = mongoose.model('Product',productSchema);
module.exports = product