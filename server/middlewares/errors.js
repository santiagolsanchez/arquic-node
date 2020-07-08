const typesError = require('../errors/types'),
    logger = require('../logger');


const statusCodes = {
    [typesError.NOT_FOUND]: 404,
    [typesError.BAD_REQUEST]: 400,
    [typesError.INVALID_BUSINESS_RULE]: 422,
    [typesError.DEFAULT_ERROR]: 500
};

exports.handle = (error, req, res, next) => {
    res.status(statusCodes[error.internalCode] || statusCodes[typesError.DEFAULT_ERROR]);
    if (res.statusCode >= 500) {
        next(error);
    }
    logger.error(error);
    return res.send({ internal_code: error.internalCode, message: error.message });
};