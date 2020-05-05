const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const validRoles = {
    values: ["ADMIN", "USER"],
    message: '{VALUE} it`s not a valid role'
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es Necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es Necesario']

    },
    password: {
        type: String,
        required: [true, 'La contraseña es Necesario'],
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER',
        enum: validRoles
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },

});

//Para que al regresar el usuario registrado no regrese la contraseña
userSchema.methods.toJSON = function() {
    const user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

//Validamos que el correo sea unico en la Base de Datos
userSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
});

module.exports = mongoose.model('User', userSchema);