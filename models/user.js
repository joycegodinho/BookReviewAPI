const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: {
        type: String,
        require: true,
        index: { unique: true }
    },
    username: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        require: true
    },
    favorites: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
 },
 {
    timestamps: true
 }
);

module.exports = mongoose.model('User', userSchema);