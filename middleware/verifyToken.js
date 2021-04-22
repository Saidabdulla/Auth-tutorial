const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {  
    const token = req.header('auth-token-x');
    if (!token) return res.status(401).send('Access denied!');

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.foydalanuvchi = verified;
        next();
    }
    catch (e) {
        res.status(400).send('Invalida token!');
    }
}