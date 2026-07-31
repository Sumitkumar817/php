import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import headerRoutes from './routes/headerRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import section2Routes from './routes/section2Routes.js';
import section3Routes from './routes/section3Routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware with 100MB payload limit for base64 image/video uploads
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/header', headerRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/section2', section2Routes);
app.use('/api/section3', section3Routes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'UNISE Admin Backend API Server Running', status: 'OK' });
});

// Global Express Error Handler
app.use((err, req, res, next) => {
  console.error('Express Error Handler caught:', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend Server running on port ${PORT}`);
});
