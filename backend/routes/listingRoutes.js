const router = require('express').Router();
// const io = require('socket.io');

// const socket = io('http://localhost:8003');

module.exports = db => {

  // GET /api/listings
  router.get(`/`, (req, res) => {
    // Check if filter exists
    const queryParams = req.query.q;
    // Base query
    let queryString = 'SELECT * FROM listings';

    if (!queryParams) {
      queryString = {
        text: `${queryString} ORDER BY id ASC;`
      }
    } else {
      // FILTER FOR CITY, PRICE< NUMBER OF BEDROOMS
      // Example of filter: city:calgary,price:100-500,bedroom:2
      const filters = queryParams.split(',');
  
      const whereString = filters.map(filter => {
        // Split each filter by column
        const [key, value] = filter.split(':');
        // Check if key and value exist
        if (key && value) {
          if (key === 'price') {
            const [min, max] = value.split('-');
            return `listings.${key} >= ${min} AND listings.${key} <= ${max}`;
          } else if (key === 'city') {
            return `LOWER(listings.${key}) LIKE '%${value.toLowerCase()}%'`;
          } else {
            return `listings.${key} <= ${value}`;
          }
        }
      }).filter(Boolean).join(' AND ');

  
      queryString = {
        text: `${queryString} WHERE ${whereString} ORDER BY id ASC;`
      }  
    }

    // QUERY THE DATABASE TO GET THE LISTINGS
    db.query(queryString)
      .then(response => {
        const data =  response.rows;
        if (data.length === 0) {
          return res.status(200).json({ message: "No Listings Found" });
        }
        res.status(200).json({
          total: data.length,
          data
        })
      })
      .catch(e => res.status(400).json({error: e}))
    

  });

  // POST NOTIFICATIONS TO USERS
  // req.body should contain a user_id
  router.post('/:listing_id/notifications/:listing_user_id', (req, res) => {

    // Check if user is logged in
    if (!req.body.user_id ) {
      return res.status(400).send({message: '400 Bad Request'})
    }
    // Send a default message from the current user to listing's user
    const listingUserId = req.params.listing_user_id; 

    const notificationMessage = `Someone viewed your listing and wants to match with you.`;

    // Emit the notification event to the specified user
    // socket.emit('notification', { to: listingUserId, from: req.body.user_id, message: notificationMessage });

    res.status(200).json({ status: 'Ok', message: notificationMessage, meta: `message from ${req.body.user_id} to ${listingUserId}` });
  });


  // Detail page for one specific listing item
  // GET /api/listings/:listing_id
  router.get('/:listing_id', async (req, res) => {
    try {
      const listingId = req.params.listing_id;

      // Fetch listing item details
      const listing = await db.query('SELECT * FROM listings WHERE id = $1', [listingId]);
      console.log("This is a listing:", listing.rows);
      // Fetch reviews for the listing
      const reviews = await db.query('SELECT * FROM reviews WHERE listing_id = $1', [listingId]);
      console.log("This is the reviews:", reviews.rows);
      // Combine listing details and reviews in the response
      const result = {
        listing: listing.rows[0],
        reviews: reviews.rows
      };

      console.log(result);
      res.json(result);
    } catch (error) {
      console.error('Error fetching listing and reviews:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // POST a new review for a specific listing
  // POST /api/listings/:listing_id/reviews
  router.post('/:listing_id/reviews', async (req, res) => {
    try {
      const listingId = req.params.listing_id;
      const { user_id, review, rating } = req.body;

      // Insert the new review into db
      await db.query('INSERT INTO reviews (listing_id, user_id, review, rating) VALUES ($1, $2, $3, $4)', [listingId, user_id, review, rating]);

      // Fetch all reviews for the listing, including the newly added one
      const reviews = await db.query('SELECT * FROM reviews WHERE listing_id = $1', [listingId]);

      res.status(201).json({ message: 'Review posted!', reviews: reviews });
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  return router;
}
