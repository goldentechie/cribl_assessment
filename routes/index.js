var express = require('express');
var getLogFiles = require('../utils/getLogFiles');
const searchValidator = require('../validators/searchValidator');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET log file list. */
router.get('/files', getLogFiles, function (req, res, next) {
  if (req.query.type == "view")
    res.render('filelist', req.logFiles);
  else res.send(req.logFiles);
});

/* GET search. */
router.get('/search', getLogFiles, searchValidator, function (req, res, next) {
  const files = req.logFiles.files;
  if (! files.includes(req.query.filename)) res.render('search', { message: "File not found."});
});

module.exports = router;
