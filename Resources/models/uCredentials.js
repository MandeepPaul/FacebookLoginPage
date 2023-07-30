var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    uname: String,
    pass: String,
});

var SecureLoginUsers = mongoose.model('SecureLoginUsers', userSchema);
module.exports = SecureLoginUsers;