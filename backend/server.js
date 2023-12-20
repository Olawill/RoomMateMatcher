require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require("helmet");
const cors = require("cors");

const PORT = process.env.PORT || 8003;
const http = require('http');
const socketIo = require('socket.io');
const { getAllMessages, savedMessage } = require('./db/queries/chatrooms');


const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*"
  }
});

const db = require('./db/connection');

// ROUTES
const userAuthRoutes = require('./routes/userAuthRoutes');
const listingRoutes = require('./routes/listingRoutes');

// express Configuration
app.use(cors());
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// SOCKET.IO
// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);


  // initiate privatchat
  socket.on('privateChatRequest', ({ recipientId, recipientName }) => {
    const roomId = createPrivateRoomId(socket.id, recipientId);
    socket.join(roomId);
    io.to(roomId).emit('privateChatInitiated', { roomId, recipientName });
  });

  //Accepts privatechat
  socket.on('privateChatAccept', ({ senderId, senderName, roomId }) => {
    socket.join(roomId);
    io.to(roomId).emit('privateChatJoined', { roomId, senderName });
  });



  // Handle the notification event when the client emits it
  socket.on('notification', (data) => {
    console.log('Notification data received:', data);
    // Handle the notification, for example, send it to the specified user
    const {listingUserId, userId, message} = data;
    io.to(listingUserId).emit('notification', { from: userId, message: message });
  });
  
  // Handle when a user sends a message
  socket.on('message', async (data) => {
    console.log('this is the message', data);
    savedMessage(data);
    
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

  // Handle disconnecting from socekt.io
  socket.on('disconnect', () => {
    console.log('A User disconnected');
  });

});


// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.use('/api/user', userAuthRoutes);
app.use('/api/listings', listingRoutes(db));

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT} so that's pretty good 👍`);
});

