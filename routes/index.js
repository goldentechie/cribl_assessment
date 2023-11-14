var express = require('express');
var getLogFiles = require('../utils/getLogFiles');
const searchValidator = require('../validators/searchValidator');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const readLog = require('../utils/readLog');

/* 
  @method GET /files
  @description get list of log files in dir
  @return
    files: string[];
    message: string;
    succeed: boolean;
*/
router.get('/files', getLogFiles, function (req, res, next) {
  if (req.query.type == "view")
    res.render('filelist', req.logFiles);
  else res.status(200).send(req.logFiles);
});

/*
  @method GET /search
  @description get list of logs based on params
  @params
    filename: string;
    count: number;
    filter: string|undefined;
  @return
    logs: string[];
*/
router.get('/search', getLogFiles, searchValidator, function (req, res, next) {
  const files = req.logFiles.files;
  const logs = readLog(req.query);
  if (req.query.type == "view") {
    if (! files.includes(req.query.filename)) res.render('search', { message: "File not found.", results:[]});
    else res.render('search', { message: "Results:", results: logs});
  } else {
    res.status(200).send({logs});
  }
});

module.exports = router;
