const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/BookReview';
//var url = 'mongodb://localhost:27017/BookReviewTest';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

};

module.exports = mongoose.connect(url, options)
    .then(() => console.log('Connect to Database'))
    .catch(err => console.log('Error connecting to Database: ' + err))

