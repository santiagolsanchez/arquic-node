exports.notFound = message => ({
  internalCode: exports.NOT_FOUND,
  message
});

exports.defaultError = message => {
  return {
    internalCode: exports.DEFAULT_ERROR,
    message
  };
};
exports.vlipcoDefaultError = () => ({
  internalCode: exports.VLIPCO_DEFAULT_ERROR,
  message: 'Vlipco does not response'
});

exports.badRequest = message => {
  return {
    internalCode: exports.BAD_REQUEST,
    message
  };
};

exports.unauthorized = message => {
  return {
    internalCode: exports.UNAUTHORIZED,
    message
  };
};

exports.rateLimit = message => {
  return {
    internalCode: exports.RATE_LIMIT,
    message
  };
};

exports.userAlreadyConfirmed = message => {
  return {
    internalCode: exports.USER_ALREADY_CONFIRMED,
    message
  };
};

exports.parentDisabled = message => {
  return {
    internalCode: exports.PARENT_DISABLED,
    message
  };
};
exports.vlipcoServiceFail = (message, statusCode) => ({
  internalCode: statusCode,
  message
});

exports.UNAUTHORIZED = 'UNAUTHORIZED';
exports.BAD_REQUEST = 'BAD_REQUEST';
exports.NOT_FOUND = 'NOT_FOUND';
exports.DATABASE_ERROR = 'DATABASE_ERROR';
exports.DEFAULT_ERROR = 'DEFAULT_ERROR';
exports.RATE_LIMIT = 'RATE_LIMIT';
exports.USER_ALREADY_CONFIRMED = 'USER_ALREADY_CONFIRMED';
exports.PARENT_DISABLED = 'PARENT_DISABLED';
exports.VLIPCO_DEFAULT_ERROR = 'VLIPCO_INTERNAL_SERVER_ERROR';
exports.ADD_QUEUE_FAIL = 'ADD_QUEUE_FAIL';
exports.pointNotFound = exports.badRequest('Point not found');
exports.userNotAuthorized = exports.unauthorized('User is not authorized');
exports.userParentDisabled = exports.parentDisabled('User parent is disabled');
exports.commerceNotFound = exports.badRequest('Commerce not found');
exports.pointsNotFound = exports.badRequest('Points not found');
exports.userNotFound = exports.badRequest('User not found');
exports.planNotFound = exports.badRequest('Plan not found');
exports.userAdminNotFound = exports.badRequest('User admin not found');
exports.rateLimit = exports.rateLimit('Too many requests from this IP, please try again later');
exports.badCaptcha = exports.badRequest('Invalid Captcha');
exports.missingCaptcha = exports.badRequest('Missing Captcha Response');
exports.userAlreadyConfirmed = exports.userAlreadyConfirmed('User is already confirmed');
exports.notificationNotFound = exports.defaultError('Notification not found');
exports.auditFail = exports.badRequest('Audit fail');
exports.termsNotFound = exports.notFound('Terms not found');
exports.withoutPointsActive = exports.badRequest('User does not contain points actives');
exports.withPointsActive = exports.badRequest('User contain some active points');
exports.userWithTransaction = exports.badRequest('User contain one transaction pending');
exports.finishedTransaction = exports.badRequest('The transaction has been finalized');
exports.transactionNotFound = exports.badRequest('Transaction does not exist');
exports.transactionStateUnknow = exports.badRequest('Transaction state unknow');
exports.pointSaleTransactionNotFound = exports.badRequest('Points sales transaction not found');
exports.redisError = exports.defaultError('Redis error');
exports.taggingNotFound = exports.defaultError('Tagging not found');
