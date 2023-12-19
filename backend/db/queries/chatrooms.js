const db = require('../connection');

const getAllMessages = async () => {
  try {
    const result = await db.query(`
      SELECT * FROM messages;
    `);

    console.log('Messages query executed successfully.');
    return result.rows;
  } catch (error) {
    console.error('Error executing messages query:', error);
    throw error;
  }
};

const savedMessage = async (data) => {
  const insertQuery = `
    INSERT INTO messages(sender_id, recipient_id, chatroom_id, content, checked, created_at, read_at)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const createdAt = Date.now()
  console.log('this is createat', createdAt)

  const values = [
    data.senderId,
    data.recipientId,
    data.chatroomId,
    data.content,
    data.checked,
    createdAt,
    data.readAt,
  ];

  try {
    const result = await db.query(insertQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error saving message to the database:', error);
    throw error;
  }
};

module.exports = { getAllMessages, savedMessage };
