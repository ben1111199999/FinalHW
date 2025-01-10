const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// 註冊功能
exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const newUser = new User({
            username,
            password,
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

// 登入功能
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login attempt:', { username, password }); // 用於除錯

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: '用戶名或密碼錯誤' });
        }

        // 直接比對密碼（在開發環境中）
        if (password !== user.password) {
            return res.status(401).json({ message: '用戶名或密碼錯誤' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            'your-secret-key', // 請在生產環境中使用環境變數
            { expiresIn: '24h' }
        );

        res.json({
            token,
            role: user.role,
            username: user.username
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: '登入過程發生錯誤' });
    }
};