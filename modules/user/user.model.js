const {Schema,model} = require('mongoose')

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String },
    birthdate: { type: Date, required: true }
})

module.exports = model('User', UserSchema)
