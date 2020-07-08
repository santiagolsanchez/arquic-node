const errorHandler = require('./errorHandler');

const startService = () => {
    return new Promise((res, rej) => {
        res({
            ok: true
        });
    });
};

module.exports = { startService };