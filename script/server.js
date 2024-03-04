const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the specified directory
const publicDirectory = path.join(__dirname, '..'); // Go up one level to reach 'jaramba'
app.use(express.static(publicDirectory));

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Redirect all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDirectory, 'index.html'));
});

// WebSocket setup
wss.on('connection', (ws) => {
  // Handle WebSocket connections
  console.log('WebSocket connected');

  // You can send initial data to the client if needed
  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

  ws.on('close', () => {
    // Handle WebSocket disconnections
    console.log('WebSocket disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to terminate the server.');
});
