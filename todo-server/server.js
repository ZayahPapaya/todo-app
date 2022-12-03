require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Collection = require('./collection')
const User = require('./model');
const verifyUser = require('./auth');

const app = express();
app.use(cors());
app.use(express.json());
//app.use(verifyUser);

app.use((req, res, next) => {
  console.log(new Date(), req.url);
  next();
})
mongoose.connect(process.env.DATABASE_URL); //TODO: set up a Mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongoose is connected'));
const PORT = process.env.PORT || 3001;
app.get('/', (request, response) => response.send('test request received'));
new Collection(User, app, 'history');
// DONE: Set up what schema should look like for this
// DONE: Set up Auth0 middleware to validate they're logged in
// DONE: Roles in the Collection?

app.listen(PORT, () => console.log(`listening on ${PORT}`))