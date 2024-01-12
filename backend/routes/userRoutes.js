const router = require('express').Router();

module.exports = db => {
  // GET /api/user - get all users
  router.get('/', (req, res) => {
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


  // POST /api/user/:userSub/favourites
  // This route handles the creation or update of a favourite listing for a user
  router.post('/:userSub/favourites', async (req, res) => {
    const userSub = req.params.userSub;
    const { listingId, isFavourite } = req.body;

    try {
      // Retrieve the user ID from the users table based on the user's sub
      const userResult = await db.query('SELECT id FROM users WHERE sub = $1', [userSub]);
      if (userResult.rows.length === 0) {
        return res.status(404).send('User not found');
      }
      const userId = userResult.rows[0].id;

      // Check if the favourite listing already exists
      const favListingExists = await db.query(
        'SELECT * FROM favourites WHERE user_id = $1 AND listing_id = $2',
        [userId, listingId]
      );

      // Update the favourite status if it exists, otherwise insert a new record
      if (favListingExists.rows.length > 0) {
        console.log({ userId, listingId, isFavourite });
        await db.query(
          'UPDATE favourites SET isFavourite = $1 WHERE user_id = $2 AND listing_id = $3',
          [isFavourite, userId, listingId]
        );
      } else {
        console.log({ userId, listingId, isFavourite });
        await db.query(
          'INSERT INTO favourites (user_id, listing_id, isFavourite) VALUES ($1, $2, $3)',
          [userId, listingId, isFavourite]
        );
      }
      res.status(200).send('Favourite listing status updated');
    } catch (err) {
      console.error('Error in /api/user/:userSub/favourites route:', err);
      res.status(500).send('Server error');
    }
  });


  // GET /api/user/:userSub/favourites
  // This route retrieves the list of favourite listings for a user
  router.get('/:userSub/favourites', async (req, res) => {
    const userSub = req.params.userSub;

    try {
      // Retrieve the user ID from the users table based on the user's sub
      const userResult = await db.query('SELECT id FROM users WHERE sub = $1', [userSub]);
      if (userResult.rows.length === 0) {
        return res.status(404).send('User not found');
      }
      const userId = userResult.rows[0].id;


      // Fetch the list of favourite listings for the user
      const favouriteListings = await db.query(
        'SELECT ' +
        'listings.id, ' +
        'listings.title, ' +
        'listings.description, ' +
        'listings.number_of_rooms, ' +
        'listings.number_of_roommates, ' +
        'listings.preference, ' +
        'listings.status, ' +
        'listings.price, ' +
        'listings.postal_code, ' +
        'listings.city, ' +
        'listings.country, ' +
        'listings.image_url, ' +
        'listings.created_at, ' +
        'listings.updated_at, ' +
        'favourites.isFavourite ' +
        'FROM listings ' +
        'INNER JOIN favourites ON listings.id = favourites.listing_id ' +
        'WHERE favourites.user_id = $1 AND favourites.isFavourite = TRUE',
        [userId]
      );

      res.status(200).json(favouriteListings.rows);
    } catch (err) {
      console.error('Error in /api/user/:userSub/favourites route:', err);
      res.status(500).send('Server error');
    }
  });

  return router;
}
