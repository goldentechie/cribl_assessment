const fs = require('fs');

const getLogFiles = (req, res, next) => {
  try {
    const logFiles = fs.readdirSync(process.env.LOG_DIR).filter(file=>file.endsWith(".log"));
    req.logFiles = {
      files: logFiles,
      message: `${logFiles.length} log file(s).`,
      succeed: true
    }
  } catch (e) {
    req.logFiles = {
      files: [],
      message: e.message,
      succeed: true
    }
  }
  next();
}

module.exports = getLogFiles;