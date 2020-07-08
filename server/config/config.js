const ENVIRONMENT = require(`./${process.env.NODE_ENV}`);

const config = {
    environment: ENVIRONMENT.configEnvironment,
    common: {
        port: process.env.NODE_API_PORT
    },
    api: {
        bodySizeLimit: process.env.API_BODY_SIZE_LIMIT,
        parameterLimit: process.env.API_PARAMETER_LIMIT
    }
};

module.exports = { config };