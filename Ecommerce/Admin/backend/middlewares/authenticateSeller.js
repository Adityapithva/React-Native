const jwt = require('jsonwebtoken');
const Seller = require("../models/Seller");

const authenticateSeller = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'Token format is incorrect' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const seller = await Seller.findById(decoded.id);
        if (!seller) return res.status(404).json({ msg: 'Seller not found' });

        req.seller = seller;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authenticateSeller;
