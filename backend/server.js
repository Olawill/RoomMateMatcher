
require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const helmet = require("helmet");
const cors = require("cors");
const PORT = process.env.PORT || 8003;

const db = require('./db/connection');

// ROUTES
const userRoutes = require('./routes/userRoutes');
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

  // Handle the notification event when the client emits it
  socket.on('notification', (data) => {
    console.log('Notification data received:', data);
    // Handle the notification, for example, send it to the specified user
    const {listingUserId, userId, message} = data;
    io.to(listingUserId).emit('notification', { from: userId, message: message });
  });

  // Handle disconnecting from socekt.io
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

});

// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.use('/api', userRoutes(db));
app.use('/api', listingRoutes(db));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening on port ${PORT} so that's pretty good 👍`);
});