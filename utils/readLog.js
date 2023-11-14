const ReverseReader = require("../reverse_reader/lib/binding.js");
const path = require("path");

const readLog = ({filename, count, filter}) => {
  try {
    const reader = new ReverseReader(path.resolve(process.env.LOG_DIR, filename));
    var line;
    var result = [];
    filter = filter.toLowerCase();
    while (count > 0 && (line = reader.readLine()) != undefined) {
      if (filter!=undefined && !line.toLowerCase().includes(filter)) continue;
      result.push(line);
      count --;
    }
    reader.close();
  } catch (e) {
    return [];
  }
  return result;
}

module.exports = readLog;
