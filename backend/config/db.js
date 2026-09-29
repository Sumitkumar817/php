import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedAllData } from './seeder.js';

dotenv.config();

const MONGO_URI = (process.env.MONGO_URI && process.env.MONGO_URI.trim()) || 'mongodb+srv://sanektsumit_db_user:N9h1FnJidm27myOp@cluster0.f2mrqol.mongodb.net/unise_security?retryWrites=true&w=majority&appName=Cluster0';

let isConnected = false;

// Global process exception safety to prevent TLS Alert 80 from crashing server
process.on('uncaughtException', (err) => {
  if (err.message && (err.message.includes('SSL routines') || err.message.includes('tlsv1 alert'))) {
    // Gracefully handle SSL handshake notices from Atlas network filters
  } else {
    console.error('Uncaught Exception:', err);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  if (reason && reason.message && reason.message.includes('SSL routines')) {
    // Suppress SSL rejection warning
    return;
  }
  console.warn('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Connection event listeners
mongoose.connection.on('connected', () => {
  isConnected = true;
  console.log(`📡 [Database] MongoDB Atlas Connected (${mongoose.connection.name || 'db'})`);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('⚠️ [Database] MongoDB Atlas Disconnected');
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  console.log('🔄 [Database] MongoDB Atlas Reconnected');
});

mongoose.connection.on('error', (err) => {
  if (err && err.message && (err.message.includes('SSL routines') || err.message.includes('tlsv1 alert'))) {
    return;
  }
  console.warn('Mongoose connection notice:', err.message || err);
});

export const connectDB = async () => {
  const uri = (process.env.MONGO_URI && process.env.MONGO_URI.trim()) || MONGO_URI;
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      family: 4
    });
    isConnected = true;
    console.log(`✅ MongoDB Atlas Connected Successfully: ${conn.connection.host} / Database: ${conn.connection.name}`);
    
    // Auto-seed initial default data if database is fresh
    await seedAllData();
    return true;
  } catch (error) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 8000,
        tls: true,
        tlsAllowInvalidCertificates: true,
        family: 4
      });
      isConnected = true;
      console.log(`✅ MongoDB Atlas Connected (Fallback TLS Config): ${conn.connection.host} / Database: ${conn.connection.name}`);
      
      // Auto-seed initial default data if database is fresh
      await seedAllData();
      return true;
    } catch (fallbackErr) {
      console.warn(`❌ MongoDB Atlas Notice: Could not connect to Atlas cluster (${fallbackErr.message}).`);
      console.warn(`Tip: If using MongoDB Atlas, make sure your current IP address is whitelisted in Atlas (Network Access -> Add IP -> 0.0.0.0/0).`);
      isConnected = false;
      return false;
    }
  }
};

export const getDBStatus = () => {
  return mongoose.connection.readyState === 1 || isConnected;
};
