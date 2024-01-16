const router = require('express').Router();

module.exports = (db, io) => {

  // GET /api/chatrooms
  router.get('/myMessages', (req, res) => {
    db.query('SELECT * FROM chatrooms ORDER BY id ASC;')
      .then(response => {
        const data = response.rows;
        if (data.length === 0) {
          return res.status(200).json({ message: "No Chatrooms Found" });
        }
        res.status(200).json({
          total: data.length,
          data
        });
      })
      .catch(error => res.status(400).json({ error }));
  });

  // GET /api/chatrooms/:user_id
router.get('/:user_id', (req, res) => {
  const userId = req.params.user_id;

  db.query(`
  SELECT *
  FROM chatrooms
  JOIN users_chatrooms ON chatrooms.id = users_chatrooms.chatroom_id
  WHERE users_chatrooms.user_id = $1
  ORDER BY chatrooms.id ASC;
  `, [userId])
    .then(response => {
      const data = response.rows;
      if (data.length === 0) {
        return res.status(200).json({ message: `No Chatrooms Found for user with ID ${userId}` });
      }
      res.status(200).json({
        total: data.length,
        data
      });
    })
    .catch(error => res.status(400).json({ error }));
});


  // GET /api/chatrooms/:id/messages
  router.get('/:id/messages', (req, res) => {

  const chatroomId = req.params.id;

  if (!chatroomId) {
    return res.status(400).json({ error: 'Invalid chatroom ID' });
  }

    // Fetch messages for the specified chatroom
    db.query(
      `SELECT messages.*, username as author, image_url as picture FROM messages
      JOIN users ON users.id = messages.sender_id
      WHERE chatroom_id = $1 ORDER BY id ASC;`, 
      [chatroomId]
    )
      .then(response => {
        const data = response.rows;
        if (data.length === 0) {
          return res.status(200).json({ message: "No Messages Found for the Chatroom" });
        }
        res.status(200).json({
          total: data.length,
          data
        });
      })
      .catch(error => res.status(400).json({ error }));
  });

  // POST /api/chatrooms/:id/messages
  router.post('/:id/messages', (req, res) => {
    const chatroomId = req.params.id;
    const { content, author } = req.body;

    // Insert the new message into the messages table
    db.query('INSERT INTO messages (chatroom_id, content, author) VALUES ($1, $2, $3) RETURNING *;', [chatroomId, content, author])
      .then(response => {
        const newMessage = response.rows[0];
        console.log(newMessage);
        
        // Emit the new message to the chatroom using Socket.io
        io.to(chatroomId).emit('receive_message', newMessage);

        res.status(201).json({
          status: 'Ok',
          data: newMessage
        });
      })
      .catch(error => res.status(400).json({ error }));
  });

  router.post('/create', async (req, res) => {
    const { senderId, recipientId, name } = req.body;
    console.log('ids', senderId, recipientId, name)

    try {
      // Check if a chat room already exists for these users
      const existingChatRoom = await db.query(
        'SELECT * FROM chatrooms WHERE ((user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)) AND name = $3;',
        [senderId, recipientId,name]
      );

      if (existingChatRoom.rows.length > 0) {
        // If a chat room already exists, return the existing room details
        return res.json(existingChatRoom.rows[0]);
      }

      // If no existing chat room, create a new one
      const result = await db.query(
        'INSERT INTO chatrooms (user1_id, user2_id, name) VALUES ($1, $2, $3) RETURNING *',
        [senderId, recipientId, name]
      );
      const newChatRoomId = result.rows[0].id
      console.log('room id', newChatRoomId)

      const result2 = await db.query(
        'INSERT INTO users_chatrooms (user_id, chatroom_id) VALUES ($1, $2) RETURNING *',
        [senderId, newChatRoomId]
      );

      const result3 = await db.query(
        'INSERT INTO users_chatrooms (user_id, chatroom_id) VALUES ($1, $2) RETURNING *',
        [recipientId, newChatRoomId]
      );

      const newChatRoom = result.rows[0];

      // // Emit a notification to the recipient user using Socket.io
      // io.to(recipientId).emit('privateChatRequest', { roomId: newChatRoom.id, senderId });

      res.status(201).json({
        status: 'Ok',
        data: newChatRoom
      });
    } catch (error) {
      console.error('Error creating private chat room:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};
