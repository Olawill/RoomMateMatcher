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

const savedMessage = async (messageData) => {
  const insertQuery = `
    INSERT INTO messages(sender_id, recipient_id, chatroom_id, content, checked, created_at, read_at)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const createdAt = new Date();
  const readAt = new Date();


  const values = [
    messageData.sender_id,
    messageData.recipient_id,
    messageData.chatroom_id,
    messageData.content,
    messageData.checked,
    createdAt,
    readAt
  ];
// console.log('this is values', values)
  try {
    const result = await db.query(insertQuery, values);
    // console.log('this is the insert query:', insertQuery);

    return result.rows[0];
  } catch (error) {
    console.error('Error saving message to the database:', error);
    throw error;
  }
};

module.exports = { getAllMessages, savedMessage };
