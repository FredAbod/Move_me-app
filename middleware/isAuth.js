const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
const Admin = require('../models/admin.models.js');


exports.isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Invalid token'});

        }
        const decoded =  jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            throw new Error();
        }
        req.admin = decoded;
        console.log('=================req.admin');
        console.log(req.admin);
        console.log('=================req.admin');
         next();
    } catch (e) {
        return res.status(401).json(` signUp as admin || Token expired \n ${e}`);
    }
};

exports.validateAdmin = async (req, res, next) => {
    try {
        const id = req.Admin._id;

        const admin =  Admin.findOne({ adminId: id });
        if (admin.role !== 'admin') {
            return res
              .status(401)
              .json({ message: 'You are not authorized to access this route' });
          }
    } catch (error) {
        next();
    }
};
exports.userIsAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Invalid token'});

        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            throw new Error();
        }
        req.user = decoded;
        console.log('=================req.user');
        console.log(req.user);
        console.log('=================req.user');
         next();
    } catch (e) {
        return res.status(401).json(` signUp as user || Token expired \n ${e}`);
    }
};
