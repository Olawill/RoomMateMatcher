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
    origin: "*",
    methods: ["GET", "POST"],

  }
});

const db = require('./db/connection');

// express Configuration
app.use(cors());
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle the notification event when the client emits it
  socket.on('notification', (data) => {
    console.log('Notification data received:', data);
    // Handle the notification, for example, send it to the specified user
    const {listingUserId, userId, message} = data;
    io.to(listingUserId).emit('notification', { from: userId, message: message });
  });
  
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log('send message',data)
    savedMessage(data);
  });
  
  socket.on("join_room", (data) => {
    socket.join(data);
  });


  // Handle disconnecting from socekt.io
  socket.on('disconnect', () => {
    console.log('A User disconnected');
  });

});

// ROUTES
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');

// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.use('/api/user', userRoutes(db));
app.use('/api/listings', listingRoutes(db));

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT} so that's pretty good 👍`);
});

