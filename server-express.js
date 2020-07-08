const appExpress = require('./server/server'),
    logger = require('./server/logger/index'),
    { config } = require('./server/config/config'),
    port = config.common.port;

appExpress.init();
appExpress.app.listen(port);
logger.info(`Listening on port: ${port}`);

module.exports = appExpress.app;