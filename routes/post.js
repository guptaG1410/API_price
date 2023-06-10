const express = require('express');
const Route = require('../model/flights');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let { source, destination, date } = req.body;
    const resp = await Route.findOne({ source, destination });
    if (!resp) res.status(400).json({ message: 'Route not found!!' });

    res.status(200).json({ resp });
    console.log(`Route found for ${find} on ${date}`);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
