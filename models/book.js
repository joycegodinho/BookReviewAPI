const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema ({ 
    title: {
        type: String,
        required: true   
    },
    author: {
        type: String
    },
    pages: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    favoritedBy: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    favoriteCount: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Book', bookSchema);
