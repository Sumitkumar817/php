import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://samofficialsamuel8_db_user:dfFlmTLNChmR9doK@cluster0.i30toji.mongodb.net/admin_panel_db?retryWrites=true&w=majority';

let isConnected = false;

// Global process exception safety to prevent TLS Alert 80 from crashing server
process.on('uncaughtException', (err) => {
  if (err.message && err.message.includes('SSL routines')) {
    console.warn('Caught TLS/SSL Alert 80 warning:', err.message);
  } else {
    console.error('Uncaught Exception:', err);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.warn('Unhandled Rejection at:', promise, 'reason:', reason);
});

export const connectDB = async () => {
  try {
    // Attempt standard Atlas connection with TLS parameters
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      tls: true,
      tlsAllowInvalidCertificates: true, // Fix for SSL alert number 80 OpenSSL issue
      family: 4 // Enforce IPv4 socket connection
    });
    isConnected = true;
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Primary Atlas TLS Connection failed (${error.message}). Trying fallback TLS config...`);
    try {
      // Fallback connection attempt
      const conn = await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        family: 4
      });
      isConnected = true;
      console.log(`MongoDB Atlas Connected (Fallback): ${conn.connection.host}`);
    } catch (fallbackErr) {
      console.warn(`MongoDB Atlas Connection Notice: Operating with database store (${fallbackErr.message})`);
      isConnected = false;
    }
  }
};

// Connection status listener
mongoose.connection.on('error', (err) => {
  console.warn('Mongoose background connection event error:', err.message || err);
});

export const getDBStatus = () => isConnected;
