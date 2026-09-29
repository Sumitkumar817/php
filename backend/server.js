import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB, getDBStatus } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import headerRoutes from './routes/headerRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import section2Routes from './routes/section2Routes.js';
import section3Routes from './routes/section3Routes.js';
import section4Routes from './routes/section4Routes.js';
import section5Routes from './routes/section5Routes.js';
import section6Routes from './routes/section6Routes.js';
import aboutRoutes from './about/aboutRoutes.js';
import contactRoutes from './contact/contactRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import footerRoutes from './routes/footerRoutes.js';
import marqueeRoutes from './routes/marqueeRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB().catch(err => {
  console.warn('Initial MongoDB connection attempt error:', err.message);
});

// Middleware with 100MB payload limit for base64 image/video uploads
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/header', headerRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/marquee', marqueeRoutes);
app.use('/api/section2', section2Routes);
app.use('/api/section3', section3Routes);
app.use('/api/section4', section4Routes);
app.use('/api/section5', section5Routes);
app.use('/api/section6', section6Routes);
app.use('/api/about', aboutRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/footer', footerRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'UNISE Admin Backend API Server Running',
    status: 'OK',
    database: getDBStatus() ? 'Connected' : 'Offline / In-Memory'
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    server: 'UNISE Backend API',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    database: {
      connected: getDBStatus(),
      readyState: mongoose.connection.readyState,
      name: mongoose.connection.name || 'unise_security',
      host: mongoose.connection.host || 'cluster0'
    },
    cloudinary: {
      configured: Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
    }
  });
});

// Global Express Error Handler
app.use((err, req, res, next) => {
  console.error('Express Error Handler caught:', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use by another process. Please close the process using port ${PORT} or configure PORT in .env.`);
  } else {
    console.error('❌ Server error:', err);
  }
});
