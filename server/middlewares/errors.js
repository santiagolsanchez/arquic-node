const errors = require('../errors'),
    logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
    [errors.NOT_FOUND]: 404,
    [errors.BAD_REQUEST]: 400,
    [errors.UNAUTHORIZED]: 401,
    [errors.DATABASE_ERROR]: 503,
    [errors.DEFAULT_ERROR]: 500,
    [errors.ADD_QUEUE_FAIL]: 500,
    [errors.RATE_LIMIT]: 429,
    [errors.USER_ALREADY_CONFIRMED]: 400,
    [errors.VLIPCO_DEFAULT_ERROR]: 500,
    [errors.PARENT_DISABLED]: 403
};

exports.handle = (error, req, res, next) => {
    res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
    if (res.statusCode >= 500) {
        next(error);
    }
    logger.error(error);
    return res.send({ message: error.message, internal_code: error.internalCode });
};