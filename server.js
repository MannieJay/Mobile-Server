const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://honey:honey123@ds119064.mlab.com:19064/todoschema');

const app = express();
app.use(bodyParser.json());
app.use(cors());

require('./controllers')(app);

app.get('/', (req, res) => {
  res.send('Connection established!');
});

app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});
