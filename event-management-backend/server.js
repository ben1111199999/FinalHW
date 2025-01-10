const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/events', require('./src/routes/event.routes'));
app.use('/api/participants', require('./src/routes/participant.routes'));
app.use('/api/auth', require('./src/routes/auth.routes')); // 添加認證路由

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`CORS is enabled for origin: ${corsOptions.origin}`);
});

process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection:', err.message);
    process.exit(1);
});