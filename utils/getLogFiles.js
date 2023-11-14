const fs = require('fs');

const getLogFiles = () => {
  try {
    const logFiles = fs.readdirSync(process.env.LOG_DIR).filter(file=>file.endsWith(".log"));
    return {
      files: logFiles,
      message: `${logFiles.length} log file(s).`,
      succeed: true
    }
  } catch (e) {
    return {
      files: null,
      message: e.message,
      succeed: true
    }
  }
}

module.exports = getLogFiles;