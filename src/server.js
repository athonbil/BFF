require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Routes
const coursesRoutes = require('./routes/courses.routes');
const usersRoutes = require('./routes/users.routes');
const aggregationRoutes = require('./routes/aggregation.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'WiseTraining BFF',
        timestamp: new Date().toISOString() 
    });
});

// API Routes
app.use('/api/courses', coursesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/aggregation', aggregationRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: err.message 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 BFF Server running on port ${PORT}`);
    console.log(`📊 Health check available at http://localhost:${PORT}/health`);
});
