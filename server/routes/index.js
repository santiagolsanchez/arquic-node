const express = require('express');

exports.init = app => {
    app.use(require('./test'));
};