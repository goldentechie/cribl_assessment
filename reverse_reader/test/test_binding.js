const ReverseReader = require("../lib/binding.js");

const reader = new ReverseReader('D:\\Calls\\Cribl @ Eric\\THA\\sample_log_dir\\example1.log');

while ((line = reader.readLine()) !== undefined) {
  console.log(line);
}

reader.close();