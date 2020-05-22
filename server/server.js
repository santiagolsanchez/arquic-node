const bodyParser = require('body-parser'),
    dotenv = require('dotenv').config(),
    express = require('express'),
    path = require('path'),
    routes = require('./routes'),
    logger = require('./logger/index'),
    errors = require('./middlewares/errors'),
    fs = require('fs'),
    rfs = require('rotating-file-stream'),
    morgan = require('morgan');

const config = require('./config/config');

const bodyParserJsonConfig = () => ({
    parameterLimit: config.common.api.parameterLimit,
    limit: config.common.api.bodySizeLimit
});

const bodyParserUrlencodedConfig = () => ({
    extended: true,
    parameterLimit: config.common.api.parameterLimit,
    limit: config.common.api.bodySizeLimit
});

const init = () => {
    const app = express();
    const port = config.common.port;
    module.exports = app;

    // Client must send "Content-Type: application/json" header
    app.use(bodyParser.json(bodyParserJsonConfig()));
    app.use(bodyParser.urlencoded(bodyParserUrlencodedConfig()));

    // Config Log Morgan
    morgan.token('req-params', req => req.params);
    app.use(
        morgan(
            '[:date[clf]] :remote-addr - Request ":method :url" with params: :req-params. Response status: :status.'
        )
    );
    var accessLogStream = rfs.createStream('access.log', {
        interval: '1d', // rotate daily
        path: path.join(__dirname, 'logger/access')
    });
    app.use(morgan('combined', { stream: accessLogStream }));

    Promise.resolve()
        .then(() => {
            routes.init(app);

            app.use(errors.handle);

            app.listen(port);

            logger.info(`Listening on port: ${port}`);
        })
        .catch(logger.error);
};
init();