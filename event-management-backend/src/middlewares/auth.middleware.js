// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: '請先登入' });
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) return res.status(403).json({ message: '驗證失敗' });
        req.user = user;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: '需要管理員權限' });
    }
    next();
};