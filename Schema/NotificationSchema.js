const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    expiryDate:{
        type:String,
        required:true,
    },
    notifyOnDate:{
        type:String,
        required:true,
    }
})

const notification = mongoose.model('Notification',notificationSchema);
module.exports = notification