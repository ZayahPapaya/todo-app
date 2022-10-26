require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(new Date(), req.url);
  next();
})
mongoose.connect(process.env.DATABASE_URL); // set up a Mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongoose is connected'));
const PORT = process.env.PORT || 3001;

//  app.get // use handlers for CRUD
//  app.delete
//  app.put
//  app.get

app.listen(PORT, () => console.log(`listening on ${PORT}`))