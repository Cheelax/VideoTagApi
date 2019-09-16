const express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
const cors = require('cors');

const db = require('./config/db.config.js');

const corsOptions = {
  origin: 'https://localhost:4200',
  optionsSuccessStatus: 200
};

var app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
  'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride());

db.sequelize.sync({
  force: false
}).then(() => {
  console.log('Drop and Resync with { force: false }');
});

var videoRoute = require('./route/video.route.js')(app);
var tagRoute = require('./route/tag.route.js')(app);
var server = app.listen(8080, function () {});