const errorMessages = {
    common: {
        invalidValidation: 'error in data validation',
        undefinedValidations: 'undefined task validations'
    },
    pubSub: {
        timeUp: 'notification timeout exceeded expected limit'
    },
    workflow: {
        invalidBusinessRules: 'error validating business rules',
        notFoundRule: 'the business rule does not exist',
        failedNextTask: 'error finding next task in process',
        unvalidValidation: 'task validation is undefined',
        invalidBusinessRuleSize: 'the size of the business rule must be less than 32KB'
    },
    calculations: {
        invalidOperation: 'error in the execution of the operation'
    }
};

module.exports = errorMessages;