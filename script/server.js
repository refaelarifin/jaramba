const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const WebSocket = require('ws'); 

console.log("running");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle other routes
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

console.log("running")

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  const absolutePath = path.resolve(filePath);
  // console.log('Absolute File Path:', absolutePath);

  if (fs.existsSync(absolutePath)) {
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.woff': 'application/font-woff',
      '.ttf': 'application/font-ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'application/font-otf',
      '.svg': 'application/image/svg+xml'
    }[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('404 Not Found');
        } else {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('500 Internal Server Error');
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  }
});

// WebSocket setup
const wss = new WebSocket.Server({ noServer: true }); // Create a WebSocket server

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

// Integrate WebSocket with the HTTP server
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to terminate the server.');
});


