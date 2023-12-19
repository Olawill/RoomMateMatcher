const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = process.env.PORT || 8003;

const userRoute = require('./routes/user');

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

// Authentication route
App.use('/api/user', userRoute);

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT} so that's pretty good 👍`);
});