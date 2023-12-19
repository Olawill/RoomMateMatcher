const router = require('express').Router();

module.exports = db => {
  // GET /api/users - get all users
  router.get('/users', (req, res) => {
    db.query(
      `SELECT * FROM users ORDER BY id ASC`,
    ).then(response => {
      const total = response.rows.length;
      res.json({
        total: total, 
        data: response.rows,
      })
    })
    .catch(e => console.log(e));
  });

  

  return router;
}