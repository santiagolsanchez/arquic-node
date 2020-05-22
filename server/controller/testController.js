const workflowManager = require('../services/testService');

exports.start = (req, res, next) =>
    workflowManager
    .startExecution()
    .then(info => {
        res.status(200).send({ info });
    })
    .catch(next);