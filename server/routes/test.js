const express = require('express'),
    workflowController = require('../controller/testController');

const app = express();

app.post('/test', workflowController.startController);

module.exports = app;