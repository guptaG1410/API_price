const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const postRoute = require('./routes/post');
const data = require('./data/data');
const flights = require('./model/flights');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.use('/', postRoute);

// MONGODB SET UP

const PORT = process.env.PORT || 8050;

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);

    //   ADDING ONE TIME TO POPULATE THE DB.
    //   flights.insertMany(data);
    })
  )
  .catch((err) => {
    console.log(`${err} didn't connect`);
  });
