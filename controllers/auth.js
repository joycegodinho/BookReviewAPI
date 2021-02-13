const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.signUp = async (req, res) => {
    let email = req.body.email.trim().toLowerCase();
    let newUser = await new models.User(req.body);
    const hashed = await bcrypt.hash(req.body.password, 10);
    newUser.password = hashed;
    newUser.email = email;

    newUser.save((err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(result);
    });

};

exports.signIn =  async (req, res) => {
    let email = req.body.email.trim().toLowerCase();
    let user =  await models.User.findOne({ email: email})
        if (!user){
            res.status(500).json({ message: "User not found"});
        }
        let valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            res.status(500).json({ message: "Wrong password"});

        };
        res.json({ token: jwt.sign({ _id: user._id }, process.env.JWT_SECRET) });
        
};

exports.authRequired = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token){
        res.status(401).json({ message: "Don't have token"})
    }
    else {
        await jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
            if (err) {
                res.status(401).json({ message: "Unauthorized user"})
            }else {
                req.user = result;
                //res.status(200).json({ message: "Authorized user"});
                next();
                //res.json({ message: "Authorized user"});      
            }
        });
    };
};

