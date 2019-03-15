const mongoose      = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

// create a schema
const users = new Schema({
    login: String,
    email: String,
    password: String,
    loggedIn: Boolean,
    session: String
}, {collection:"users"});

// autoincrement plugin is used to increment the itemId
// autoIncrement.initialize(mongoose.connection);
// users.plugin(autoIncrement.plugin, { model: 'User', field: 'itemId' });
// we need to create a model using it
module.exports = mongoose.model('User', users);