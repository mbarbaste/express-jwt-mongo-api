const { Schema, model } = require("mongoose");

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: [4, 'Mínimo 4 caracteres']
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = model('User', UserSchema)
