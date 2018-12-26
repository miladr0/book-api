const express = require('express');
const router = express.Router();
const bookRoutes = require('./bookRoutes');

// Do work here
router.get('/', (req, res) => {
  res.send('Book API is UP!');
});

//Load Book API
router.use('/book/api/v1', bookRoutes);

module.exports = router;
