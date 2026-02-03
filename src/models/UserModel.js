import mongoose from 'mongoose'

const UserScheme = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trime: true,
        minLength: 6,
        maxLength: 254,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        maxLength: 254,
    },
    username: {
        type: String,
        default: '',
        required: true,
        triem: true,
        minLength: 3,
        maxLength: 20,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
})

export default mongoose.model('User', UserScheme)
