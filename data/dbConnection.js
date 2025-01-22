import mongoose from "mongoose";
import { MONGO_URI } from "../secrets.js";
import User from "./models/UserModel.js";
import Product from "./models/ProductModel.js";

/*
 * Mongoose Connection:
 * - Connects your Node.js application to MongoDB.
 * - Mongoose manages the connection, schema validation, and interaction with MongoDB.
 * - Connection pooling: MongoDB driver maintains multiple connections to the database to improve performance.
 * - Default pool size is 100 connections. You can adjust this using 'maxPoolSize'.
 */
export const connectDb = () => {
  mongoose.connect(MONGO_URI, {
    maxPoolSize: 10,
  }).then(()=>{
    console.log('Initial MongoDB Connection successful.');
    
  }).catch(err => {
    console.error("Initial MongoDB connection error:", err);
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    reconnect();
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Reconnecting...');
    reconnect();
  });
  mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected.');
  });

  let isReconnecting = false;

const reconnect = () => {
  if (isReconnecting) return; // Avoid multiple reconnection attempts
  isReconnecting = true;

  console.log("Retrying to connect to DB...");
  setTimeout(() => {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
    }).then(() => {
      isReconnecting = false; // Reset flag on successful connection
    }).catch((err) => {
      isReconnecting = false; // Allow retry if reconnection fails
      console.error("Reconnection error:", err);
    });
  }, 5000);
};


  return mongoose.connection;
};
