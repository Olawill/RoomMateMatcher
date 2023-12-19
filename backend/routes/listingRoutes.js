const router = require('express').Router();
// const io = require('socket.io');

// const socket = io('http://localhost:8003');

module.exports = db => {

  // GET /api/listings
  router.get(`/listings`, (req, res) => {
    const queryParams = req.query.q;
    let queryString = 'SELECT * FROM listings';

    if (!queryParams) {
      queryString = {
        text: `${queryString} ORDER BY id ASC;`
      }
    } else {
      // FILTER FOR CITY, PRICE< NUMBER OF BEDROOMS
      const filters = queryParams.split(',');
  
      const whereString = filters.map(filter => {
        const [key, value] = filter.split(':');
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
  router.post('/listings/:listing_id/notifications/:listing_user_id', (req, res) => {

    // Check if user is logged in
    if (!req.body.user_id ) {
      return res.status(400).send({message: '400 Bad Request'})
    }
    // Send a default message from the current user to listing's user
    const listingUserId = req.params.listing_user_id; 

    const notificationMessage = `Someone viewed your listing and wants to match with you.`;

    // Emit the notification event to the specified user
    // socket.emit('notification', { to: listingUserId, from: req.body.user_id, message: notificationMessage });

    res.status(200).json({ status: 'Ok', message: notificationMessage, meta: `messgae from ${req.body.user_id} to ${listingUserId}` });
  });


  return router;
}