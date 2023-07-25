const mongo = require('mongoose');
const Schema = mongo.Schema;

const NetworkInfoSchema = new Schema({
    networkid: String, 
    fullname: String, 
    device: String, 
    email: String
})

module.exports = mongo.model('NetworkInfo', NetworkInfoSchema);