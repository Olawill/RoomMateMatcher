
require('dotenv').config();
const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const helmet = require("helmet");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT || 8003;

const db = require('./db/connection');
const listingRoutes = require('./routes/listingRoutes');

// Express Configuration
App.use(cors());
App.use(helmet())
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

App.use('/api', userRoutes(db));
App.use('/api', listingRoutes(db));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT} so that's pretty good 👍`);
});