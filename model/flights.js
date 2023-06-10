const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  name: String,
  price: Number,
  total_seats: Number,
  available_seats: Number,
  route: String,
});

const flights = mongoose.model('Model', flightSchema);


module.exports =  flights;

