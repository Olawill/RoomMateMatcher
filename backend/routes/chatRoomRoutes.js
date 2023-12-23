const router = require('express').Router();

module.exports = (db, io) => {

  // GET /api/chatrooms
  router.get('/', (req, res) => {
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
  console.log('this is userid',userId)

  db.query(`
  SELECT *
  FROM chatrooms
  JOIN users_chatrooms ON chatrooms.id = users_chatrooms.chatroom_id
  WHERE users_chatrooms.user_id = $1
  ORDER BY chatrooms.id ASC;
  `, [userId])
    .then(response => {
      const data = response.rows;
      console.log('this is data',data)
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
    db.query('SELECT * FROM messages WHERE chatroom_id = $1 ORDER BY id ASC;', [chatroomId])
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
        
        // Emit the new message to the chatroom using Socket.io
        io.to(chatroomId).emit('receive_message', newMessage);

        res.status(201).json({
          status: 'Ok',
          data: newMessage
        });
      })
      .catch(error => res.status(400).json({ error }));
  });

  return router;
};
