const errorHandler = require('./errorHandler');

exports.startExecution = () =>
    new Promise((res, err) => {
        res({ ok: true });
    }).catch(errorHandler.defaultErrorMessage);