// app.js

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST ,
  user: process.env.DB_USERNAME ,
  password: process.env.DB_PASSWORD ,
  port: process.env.DB_PORT ,
  database: process.env.DB_NAME 
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Middleware for parsing JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Endpoint to check database connection status
app.get('/status', (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error connecting to database:', error);
      res.status(500).json({ error: 'Database connection error' });
      return;
    }

    res.json({ status: 'Connected to RDS database' });
    connection.release();
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
