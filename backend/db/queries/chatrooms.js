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
    VALUES($1, $2, $3, $4, $5, to_timestamp($6 / 1000.0), to_timestamp($7 / 1000.0))
    RETURNING *;
  `;
  const createdAt = Math.floor(Date.now() / 1000);
 const senderId =1
    const recipientId = 2
    const chatroomId = 1

    const checked =true

    const readAt = Math.floor(Date.now() / 1000);


  const values = [
    senderId,
    recipientId,
    chatroomId,
    data.content,
    checked,
    createdAt,
    readAt
  ];
console.log('this is values', values)
  try {
    const result = await db.query(insertQuery, values);
    console.log('this is the insert query:', insertQuery);

    return result.rows[0];
  } catch (error) {
    console.error('Error saving message to the database:', error);
    throw error;
  }
};

module.exports = { getAllMessages, savedMessage };
