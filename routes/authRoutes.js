const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import models
const User = require('../models/user');

// Validate request
const { registerValidate, loginValidate } = require('../validation');

// register
router.post('/signup', async (req, res) => {
    const { error } = registerValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

    const emailExists = await User.findOne({ email: req.body.email });
    if(emailExists) return res.status(400).send("Email already exist!");

    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hashedPwd
    });

    try {
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    }
    catch (e) {
        res.status(400).send(e);
    }
});

// login
router.post('/login', async (req, res) => {
    const { error } = loginValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send("Email not found.");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password.');

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    res.header('auth-token-x', token).send('Okay');
});

module.exports = router;
