// Require external libs

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const cors = require('cors');

// Require internal libs

const logger = require('./config/winston');

// Setup express

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(morgan('combined', { stream: logger.stream }));

 // Enable cors to the server
 
 const corsOpt = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
};

app.use(cors(corsOpt));
app.options('*', cors(corsOpt));

// Routes definition

app.use('/api', require('./routes'));

// Launch server

server.listen(process.env.PORT || 3100, () => logger.info('🚀 API listening on port 3100 🚀'));

module.exports.server = server;
