const types = require('./types'),
    messages = require('./messages');

const generateStandard = (internalCode, message) => {
    return {
        internalCode,
        message
    };
};

const notifyAWSError = e => {
    if (e.statusCode === 400) {
        throw generateStandard(
            types.BAD_REQUEST,
            e.message
        );
    }
    if (e.statusCode === 404) {
        throw generateStandard(
            types.NOT_FOUND,
            e.message
        );
    } else {
        throw generateStandard(
            types.DEFAULT_ERROR,
            e.message
        );
    }
};

const businessRulesError = e => {
    throw generateStandard(
        types.INVALID_BUSINESS_RULE,
        messages.workflow.invalidBusinessRules
    );
};

module.exports = { generateStandard, notifyAWSError, businessRulesError };