require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8003;
const http = require('http');
const socketIo = require('socket.io');
const { getAllMessages, savedMessage } = require('./db/queries/chatrooms');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*"
  }
});

// Express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());


// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle when a user sends a message
    socket.on('message', async (data) => {
    console.log('this is the message', data.content);
  
    // Broadcast the complete message object to the recipient
    io.to(data.room).emit('message', {
      sender: data.sender,
      content: data.content,
    });
  });

  // Handle when a user joins a room
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT} 👍`);
});
