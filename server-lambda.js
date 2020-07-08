const awsServerlessExpress = require('aws-serverless-express'),
    appExpress = require('./server/server');

appExpress.init();
const server = awsServerlessExpress.createServer(appExpress.app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);