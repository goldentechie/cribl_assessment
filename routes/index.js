var express = require('express');
var getLogFiles = require('../utils/getLogFiles')
var router = express.Router();

/* GET log file list. */
router.get('/files', function(req, res, next) {
    res.render('index', getLogFiles());
});

module.exports = router;
