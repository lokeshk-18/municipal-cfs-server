const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
    name: String,
    address: String,
    description: String,
    municipality: String,
    district:String,
    imageurl : String,
    mail:String
});

module.exports = mongoose.model('Complaint', ComplaintSchema);