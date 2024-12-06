const {Schema, model} = require('mongoose');

const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const UsersModel = model('users', usersSchema);

module.exports = UsersModel;