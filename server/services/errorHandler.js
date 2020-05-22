const errors = require('../errors'),
    logger = require('../logger');

const defaultErrorMessage = err => {
    if (err instanceof Sequelize.ForeignKeyConstraintError) {
        return 'Foreign Key Error';
    }

    if (err instanceof Sequelize.UniqueConstraintError) {
        return 'Unique constraint violation';
    }

    return 'Undefined error';
};

exports.notifyErrorDatabase = (e, additionalMessages = () => {}) => {
    if (e instanceof Sequelize.ForeignKeyConstraintError || e instanceof Sequelize.UniqueConstraintError) {
        const message = additionalMessages(e);
        return Promise.reject(errors.badRequest(message || defaultErrorMessage(e)));
    }

    logger.error('Database error', e);
    return Promise.reject(errors.defaultError('Database error'));
};

exports.notifyAWSError = e => {
    if (e.statusCode === 400) {
        throw errors.badRequest(e.message);
    }
    if (e.statusCode === 404) {
        throw errors.notFound(e.message);
    } else {
        throw errors.defaultError(e.message);
    }
};

exports.notifyResendCodeError = e => {
    if (e.statusCode === 400) {
        if (e.message === 'User is already confirmed.') throw errors.userAlreadyConfirmed;
        else throw errors.badRequest(e.message);
    } else {
        throw errors.defaultError(e.message);
    }
};

exports.notifySignUpError = e => {
    if (e.statusCode === 400) {
        throw errors.badRequest(e.code);
    } else {
        throw errors.defaultError(e.code);
    }
};

// exports.notifyErrorToRollbar = e => rollbar.error(new Error(e.message));

exports.transformCognitoAuthError = e =>
    errors.badRequest(!e.code || e.code.includes('UserNotFound') ? 'NotAuthorizedException' : e.code);

exports.notifyAuditFail = ({ response }) => {
    if (response.statusCode >= 500) {
        throw errors.defaultError(response.body.message);
    }
    if (response.statusCode >= 400 && response.statusCode < 500) {
        throw errors.badRequest(response.body.message);
    }
    if (response.statusCode >= 300 && response.statusCode < 400) {
        throw errors.defaultError(response.body.message);
    }
};
exports.notifyVlipcoFail = ({ response }) => {
    const errorsMessage = [];
    if (!(response.body && response.body.error)) throw errors.vlipcoDefaultError();
    if (response.body.error.reason) errorsMessage.push(response.body.error.reason);
    else if (response.body.error.messages)
        Object.keys(response.body.error.messages).map(key =>
            errorsMessage.push(...response.body.error.messages[key].map(message => `${key}: ${message}`))
        );
    if (response.statusCode >= 400 && response.statusCode < 500) {
        throw errors.badRequest(errorsMessage);
    }
    throw errors.vlipcoDefaultError();
};