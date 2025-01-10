const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
const User = require('../models/user.model');

exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const newUser = new User({
            username,
            password, // 注意：在實際應用中應該對密碼進行加密
            role: role || 'user'
        });
        
        const savedUser = await newUser.save();
        res.status(201).json({
            message: '用戶創建成功',
            userId: savedUser._id
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};