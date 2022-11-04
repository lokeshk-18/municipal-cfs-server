const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String,
    mobileno : Number,
    email : String,
    municipality : String,
    aadhaar : Number,
    dob : String,
    address : String,
    password : String,
})

module.exports = mongoose.model('User',userSchema);