const mongoose      = require('mongoose');

const Schema = mongoose.Schema;

// create a schema
const users = new Schema({
    login: String,
    email: String,
    password: String,
    loggedIn: Boolean,
    session: String,
    socketId: String,
    hashCode: String,
    score: Number
}, {collection:"users"});

module.exports = mongoose.model('User', users);