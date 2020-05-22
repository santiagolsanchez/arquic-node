const express = require('express'),
    workflowController = require('../controller/testController');

const app = express();

app.get('/test', workflowController.start);

module.exports = app;