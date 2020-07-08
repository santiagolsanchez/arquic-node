const { startService } = require('../services/testService');

const startController = async(req, res, next) => {
    const test = await startService();
    res.send(test);
};

module.exports = { startController };