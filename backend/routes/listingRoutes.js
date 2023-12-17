const router = require('express').Router();

module.exports = db => {

  // GET /api/listings
  router.get(`/listings`, (req, res) => {
    const filter = req.query.q;

    let queryString;

    if (filter) {
      queryString = {
        text: `SELECT * FROM listings WHERE LOWER(city) LIKE $1`,
        values: [`%${filter.toLowerCase()}%`],
      };
    } else {
        queryString = {
          text: `SELECT * FROM listings ORDER BY id ASC`,
        };
    }

    db.query(queryString)
      .then(response => {
        const total = response.rows.length;
        res.json({
          total: total, 
          data: response.rows,
        })
    })
    .catch(e => console.log(e));
  })




  return router;
}