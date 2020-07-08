const bodyParser = require('body-parser'),
    dotenv = require('dotenv').config(),
    express = require('express'),
    path = require('path'),
    cors = require('cors'),
    routes = require('./routes'),
    logger = require('./logger/index'),
    errors = require('./middlewares/errors'),
    fs = require('fs'),
    rfs = require('rotating-file-stream'),
    morgan = require('morgan'),
    { config } = require('./config/config'),
    app = express();

const bodyParserJsonConfig = () => ({
    parameterLimit: config.api.parameterLimit,
    limit: config.api.bodySizeLimit
});

const bodyParserUrlencodedConfig = () => ({
    extended: true,
    parameterLimit: config.api.parameterLimit,
    limit: config.api.bodySizeLimit
});

const init = () => {
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
    /*     var accessLogStream = rfs.createStream('access.log', {
            interval: '1d', // rotate daily
            path: path.join(__dirname, 'logger/access')
        });
        app.use(morgan('combined', { stream: accessLogStream })); */

    Promise.resolve()
        .then(() => {
            app.use(cors());
            routes.init(app);

            app.use(errors.handle);
        })
        .catch(logger.error);
};

module.exports = { init, app };