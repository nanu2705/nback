import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from "cors";

const app = express();
const httpServer = http.createServer(app);


app.use(cors());

// Create a new instance of Socket.IO attached to the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Your React app's URL
    methods: ['GET', 'POST']
  }
});

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // Example event: message from client
  socket.on('send_message', (data) => {
    console.log('Message received:', data);
    // Broadcast message to all clients
    io.emit('receive_message', data);
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the HTTP server and listen for requests
httpServer.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

export default app;
