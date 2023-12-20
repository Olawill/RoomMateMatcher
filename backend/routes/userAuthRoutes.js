const Express = require('express');
const router = Express.Router();
const db = require('../db/connection');

// POST /api/user - user authentication
router.post('/', async (req, res) => {
  const { user } = req.body;

  try {
    // Query the db based on user.sub
    const queryResult = await db.query('SELECT * FROM users WHERE sub = $1', [user.sub]);

    if (queryResult.rows.length > 0) {
      // User exists, send user back to frontend
      res.status(200).json(queryResult.rows[0]);
    } else {
      // User not exist, add user to db
      const insertResult = await db.query(
        'INSERT INTO users (username, sub, email, isDeleted) VALUES ($1, $2, $3, $4) RETURNING *',
        [user.nickname, user.sub, user.email, false]
      );

      // Send newly added user back to frontend
      res.status(201).json(insertResult.rows[0]);
    }
  } catch (error) {
    console.error('Error handling /api/user route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;