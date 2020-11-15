const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

const app = express();

// routes
let tracksRoute = require('./routes/tracks.route');

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});

router.use(tracksRoute);

mongoose.connect('mongodb://localhost:27017/spotify', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(res => console.log("Connected to MongoDB!"))
  .catch(err => console.log("Could not connect to MongoDB"));


const port = 8000;

app.use('/api/v1', router);

app.listen(port, () => console.log(`Server listening on port ${port}!`));