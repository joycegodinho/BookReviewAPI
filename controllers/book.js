const models = require('../models');
const mongoose = require('mongoose')

exports.allBooks = (req, res) => {
    let allBooks = models.Book.find({}, (err, result) => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).json(result);
    });
};

exports.singleBook = (req, res) => {
    let singleBook = models.Book.findById(req.params.id, (err, result) => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).json(result);
    });
};

exports.deleteBook = (req, res) => {
    let deleteBook = models.Book.findByIdAndDelete(req.params.id, (err, result) => {
    if (err){
        res.status(404).send(err);
    }
    res.status(200).json({ message: 'Deleted'});
    });
};

exports.updatedBook = (req, res) => {
    let updatedBook = models.Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, result) => {
    if (err){
        res.status(500).send(err);
    }
    res.status(200).json(result);
    });
};

exports.newBook = (req, res) => {
    let newBook = new models.Book (req.body)
    newBook.save((err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(result);
    });
};

exports.toggleFavorites = async (req, res) => {
    let bookCheck = await models.Book.findById(req.body._id,(err) => {
        if (err){
            res.status(500).send(err);
        }
    });
    const hasUser = bookCheck.favoritedBy.indexOf(req.user._id);

    if(hasUser>=0){
        models.Book.findByIdAndUpdate(
            req.body._id,
            {$pull: {favoritedBy:req.user._id}, $inc: {favoriteCount: -1}},
            {new: true},
            (err) => {
                if (err){
                    res.status(500).send(err);
                }});
        models.User.findByIdAndUpdate(
            req.user._id,
            {$pull: {favorites: req.body._id}},
            {new: true},
            (err) => {
                if (err){
                    res.status(500).send(err);
                }
                res.status(200).json({ message: 'Unfavorited'});
            });
    } else {
        models.Book.findByIdAndUpdate(
            req.body._id,
            {$push: {favoritedBy: req.user._id}, $inc: {favoriteCount: 1}},
            {new: true},
            (err) => {
                if (err){
                    res.status(500).send(err);
                }});
        models.User.findByIdAndUpdate(
            req.user._id,
            {$push: {favorites: req.body._id}},
            {new: true},
            (err) => {
                if (err){
                    res.status(500).send(err);
                }
                res.status(200).json({ message: 'Favorited'});
            });  
    }
};

exports.favorites = async (req, res) => {
    let user = await models.User.findById(req.user._id, (err) => {
        if (err){
            res.status(500).send(err);
        }
    });
    let favorites = user.favorites;
    models.Book.find().where('_id').in(favorites).exec((err, result) => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).json(result);
    });
    
};